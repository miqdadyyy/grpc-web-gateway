// Copyright 2018 dialog LLC <info@dlg.im>

import { debugLoggerDecorator, Logger, prefixLoggerDecorator } from './Logger';
import {
  StatusfulTransport,
  TransportError,
  TransportReadyState,
} from './transport';
import eioClient, { Socket, UpgradeError } from 'engine.io-client';
import EventEmitter from 'eventemitter3';
import { Unbind } from './types';
import { bindEvent } from './utils/emitterUtils';
import {
  SERVICE_PING_MESSAGE,
  SOCKET_CLOSE_CODE_HEARTBEAT_ERROR,
  SOCKET_CLOSE_CODE_NORMAL,
  SOCKET_CLOSE_CODE_SERIALIZATION_ERROR,
  SOCKET_CLOSE_CODE_TRANSPORT_ERROR,
} from './transportUtils';

export type PollingTransportConfig = {
  heartbeatInterval?: number;
  logger?: Logger;
  debug?: boolean;
  path?: string;
};

const DEFAULT_HEARTBEAT_INTERVAL = 30000;
const DEFAULT_POLLING_PATH = 'polling';

let globalId = 0;

export class PollingTransport implements StatusfulTransport {
  private id = ++globalId;

  private queue: Array<Uint8Array>;
  private socket: Socket | undefined;
  private readonly emitter: EventEmitter<{
    open: [];
    message: [Uint8Array];
    error: [TransportError];
    close: [];
  }>;
  private readonly logger: Logger;
  private cancelHeartbeat?: () => void;
  private isAlive = false;
  private readyState: TransportReadyState;
  private socketSubscriptions: Array<() => void> = [];

  constructor(endpoint: string, config: PollingTransportConfig = {}) {
    const {
      heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL,
      debug = false,
      logger = console,
    } = config;

    const { origin: transportUrl, pathname } = new URL(endpoint);
    const transportPath =
      config.path ??
      `${pathname}${pathname.endsWith('/') ? '' : '/'}${DEFAULT_POLLING_PATH}`;

    this.logger = prefixLoggerDecorator(`[Polling Transport #${this.id}]`)(
      debugLoggerDecorator(debug)(logger),
    );

    this.queue = [];
    this.emitter = new EventEmitter();
    this.readyState = 'connecting';

    this.socket = eioClient(transportUrl, {
      path: transportPath,
      transports: ['polling'],
    });
    this.socket.binaryType = 'arraybuffer';

    this.bindSocketEvent('open', () =>
      this.handleSocketOpen(heartbeatInterval),
    );

    this.bindSocketEvent('close', () => {
      this.logger.log('Connection was closed');
      this.closeSocket();
    });

    this.bindSocketEvent('error', (error) => {
      this.logger.log('Socket error', error);
      this.emitter.emit('error', new TransportError('Socket error'));
      this.closeSocket(SOCKET_CLOSE_CODE_TRANSPORT_ERROR);
    });

    this.bindSocketEvent('message', (data) => {
      this.logger.log('Message', data);
      this.isAlive = true;

      if (data instanceof ArrayBuffer) {
        const message = new Uint8Array(data);
        this.emitter.emit('message', message);
      } else {
        this.logger.error('Serialization mismatch');
        this.emitter.emit(
          'error',
          new TransportError(
            'Serialization error: incoming message must be ArrayBuffer',
          ),
        );
        this.closeSocket(SOCKET_CLOSE_CODE_SERIALIZATION_ERROR);
      }
    });
  }

  getReadyState(): TransportReadyState {
    if (!this.socket) {
      return 'closed';
    }

    return this.readyState;
  }

  private setupHeartbeat(interval: number): () => void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timerId: any;

    const check = () => {
      if (this.isAlive) {
        this.isAlive = false;
        this.sendPing();
        timerId = setTimeout(check, interval);
      } else {
        this.logger.log('Heartbeat: not alive socket');
        this.emitter.emit(
          'error',
          new TransportError(
            'Heartbeat error: server does not respond on client pings',
          ),
        );
        this.closeSocket(SOCKET_CLOSE_CODE_HEARTBEAT_ERROR);
      }
    };

    check();

    return () => {
      if (timerId !== undefined) {
        clearTimeout(timerId);
        timerId = undefined;
      }
    };
  }

  private sendPing(): void {
    if (this.getReadyState() === 'open') {
      this.logger.log('Send ping');
      this.socket?.send(SERVICE_PING_MESSAGE);
    }
  }

  handleSocketOpen(heartbeatInterval: number): void {
    this.logger.log('Connection opened');
    this.isAlive = true;
    this.readyState = 'open';
    this.cancelHeartbeat = this.setupHeartbeat(heartbeatInterval);

    this.emitter.emit('open');

    if (this.queue.length) {
      this.queue.forEach((message) => this.send(message));
      this.queue = [];
    }
  }

  onOpen(handler: () => void): Unbind {
    return bindEvent(this.emitter, 'open', handler);
  }

  onMessage(handler: (message: Uint8Array) => void): Unbind {
    return bindEvent(this.emitter, 'message', handler);
  }

  onError(handler: (error: TransportError) => void): Unbind {
    return bindEvent(this.emitter, 'error', handler);
  }

  onClose(handler: () => void): Unbind {
    return bindEvent(this.emitter, 'close', handler);
  }

  close(): void {
    this.closeSocket(SOCKET_CLOSE_CODE_NORMAL);
  }

  send(message: Uint8Array): void {
    switch (this.socket && this.readyState) {
      case 'connecting':
        this.queue.push(message);
        break;

      case 'open':
        this.socket?.send(message);
        break;

      default:
        this.emitter.emit(
          'error',
          new TransportError('Failed to send to the closed connection'),
        );
    }
  }

  private bindSocketEvent<K extends keyof EngineIoSocketEventMap>(
    type: K,
    listener: EngineIoSocketEventMap[K],
  ) {
    if (this.socket) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.socket.on(type as any, listener);
      this.socketSubscriptions.push(() => {
        // @ts-ignore: Poor typings for engine.io-client
        this.socket?.off(type, listener);
      });
    }
  }

  private closeSocket(code?: number) {
    this.readyState = 'closed';

    if (this.cancelHeartbeat) {
      this.logger.log('Stopping heartbeat...');
      this.cancelHeartbeat();
      this.cancelHeartbeat = undefined;
    }

    if (this.socket) {
      this.logger.log(`Closing socket ${code ? `(${code})` : ''}...`);

      this.socketSubscriptions.forEach((teardown) => teardown());
      this.socket.close();
      this.socket = undefined;
      this.socketSubscriptions = [];

      this.logger.log('Closed socket');
    }

    this.emitter.emit('close');
    this.emitter.removeAllListeners();
  }
}

type EngineIoSocketEventMap = {
  open: () => void;
  flush: () => void;
  drain: () => void;
  ping: () => void;
  pong: () => void;
  message: (data: string | ArrayBuffer) => void;
  close: (mes: string, detail?: Error) => void;
  error: (error: Error) => void;
  upgradeError: (error: UpgradeError) => void;
  upgrade: () => void;
};
