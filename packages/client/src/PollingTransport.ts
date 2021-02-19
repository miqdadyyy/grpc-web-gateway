// Copyright 2018 dialog LLC <info@dlg.im>

import { debugLoggerDecorator, Logger, prefixLoggerDecorator } from './Logger';
import {
  HeartbeatError,
  IntervalOrProviderFn,
  StatusfulTransport,
  TransportError,
  TransportReadyState,
} from './transport';
import eioClient, { Socket, UpgradeError } from 'engine.io-client';
import EventEmitter from 'eventemitter3';
import { Unbind } from './types';
import { bindEvent } from './utils/emitterUtils';
import {
  DEFAULT_SUSPENDED_HEARTBEAT_INTERVAL,
  resolveInterval,
  SERVICE_PING_MESSAGE,
  SOCKET_CLOSE_CODE_NORMAL,
  SOCKET_CLOSE_CODE_SERIALIZATION_ERROR,
} from './transportUtils';

export type PollingTransportConfig = {
  heartbeatInterval?: number;
  suspendedHeartbeatInterval?: IntervalOrProviderFn;
  logger?: Logger;
  debug?: boolean;
  path?: string;
};

const DEFAULT_HEARTBEAT_INTERVAL = 30000;
const DEFAULT_POLLING_PATH = 'polling';

let globalId = 0;

export class PollingTransport implements StatusfulTransport {
  private readonly id = ++globalId;
  private readonly heartbeatInterval: number;
  private readonly suspendedHeartbeatInterval: IntervalOrProviderFn;

  private queue: Array<Uint8Array>;
  private socket: Socket | undefined;
  private readonly emitter: EventEmitter<{
    open: [];
    message: [Uint8Array];
    error: [TransportError];
    close: [];
    readyState: [TransportReadyState];
  }>;
  private readonly logger: Logger;
  private cancelHeartbeat?: () => void;
  private hasResponse = false;
  private isSuspended = false;
  private readyState: TransportReadyState;
  private socketSubscriptions: Array<() => void> = [];

  constructor(endpoint: string, config: PollingTransportConfig = {}) {
    const {
      heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL,
      suspendedHeartbeatInterval = DEFAULT_SUSPENDED_HEARTBEAT_INTERVAL,
      debug = false,
      logger = console,
    } = config;

    this.heartbeatInterval = heartbeatInterval;
    this.suspendedHeartbeatInterval = suspendedHeartbeatInterval;

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

    this.bindSocketEvent('open', () => this.handleSocketOpen());

    this.bindSocketEvent('close', () => {
      this.logger.log('Connection was closed');
      this.closeSocket();
    });

    this.bindSocketEvent('error', (error) => {
      this.logger.log('Socket error', error);
      this.emitter.emit('error', new TransportError('Socket error'));
      this.emitReadyState();
    });

    this.bindSocketEvent('message', (data) => {
      this.logger.log('Message', data);

      this.hasResponse = true;
      if (this.isSuspended) {
        this.isSuspended = false;
        this.emitter.emit('readyState', 'open');
      }

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

    if (this.isSuspended && this.readyState === 'open') {
      return 'suspended';
    }

    return this.readyState;
  }

  private emitReadyState() {
    this.emitter.emit('readyState', this.getReadyState());
  }

  private setupHeartbeat(): () => void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timerId: any;
    let suspendedAttempt = 0;

    const check = () => {
      if (this.hasResponse) {
        this.hasResponse = false;
        this.ping();
        timerId = setTimeout(check, this.heartbeatInterval);
      } else {
        if (!this.isSuspended) {
          this.logger.log('Heartbeat: suspended socket');
          this.isSuspended = true;
          suspendedAttempt = 0;

          this.emitReadyState();
          this.emitter.emit(
            'error',
            new HeartbeatError(
              'Heartbeat error: server does not respond on client pings',
            ),
          );
        }

        this.emitReadyState();
        this.ping();

        const delay = resolveInterval(
          this.suspendedHeartbeatInterval,
          suspendedAttempt,
        );
        suspendedAttempt++;
        timerId = setTimeout(check, delay);
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

  ping(): void {
    const readyState = this.getReadyState();
    if (readyState === 'open' || readyState === 'suspended') {
      this.logger.log('Send ping');
      this.socket?.send(SERVICE_PING_MESSAGE);
    }
  }

  handleSocketOpen(): void {
    this.logger.log('Connection opened');
    this.hasResponse = true;
    this.isSuspended = false;
    this.readyState = 'open';
    this.cancelHeartbeat = this.setupHeartbeat();

    this.emitter.emit('open');
    this.emitReadyState();

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

  onReadyState(handler: (readyState: TransportReadyState) => void): Unbind {
    return bindEvent(this.emitter, 'readyState', handler);
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

    this.emitReadyState();
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
