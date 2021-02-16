// Copyright 2018 dialog LLC <info@dlg.im>

import { Request } from '@dlghq/grpc-web-gateway-signaling';
import { debugLoggerDecorator, Logger, prefixLoggerDecorator } from './Logger';
import { StatusfulTransport, TransportReadyState } from './transport';
import { RpcError } from './RpcError';
import eioClient, { Socket, UpgradeError } from 'engine.io-client';
import EventEmitter from 'eventemitter3';
import { Unbind } from './types';
import { bindEvent } from './utils/emitterUtils';

export type PollingTransportConfig = {
  heartbeatInterval?: number;
  logger?: Logger;
  debug?: boolean;
  path?: string;
};

const PING = Request.encode({ id: 'service', service: { ping: {} } }).finish();
const PONG = Request.encode({ id: 'service', service: { pong: {} } }).finish();
const DEFAULT_HEARTBEAT_INTERVAL = 30000;
const DEFAULT_PATH = '/polling';

let globalId = 0;

export class PollingTransport implements StatusfulTransport {
  private id = ++globalId;

  private queue: Array<Uint8Array>;
  private socket: Socket | undefined;
  private emitter: EventEmitter<{
    open: [];
    message: [Uint8Array];
    error: [RpcError];
    end: [];
  }>;
  private readonly logger: Logger;
  private cancelHeartbeat?: () => void;
  private isAlive = false;
  private readyState: TransportReadyState;
  private socketSubscriptions: Array<() => void> = [];

  constructor(endpoint: string, config: PollingTransportConfig) {
    const {
      heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL,
      debug = false,
      logger = console,
      path = DEFAULT_PATH,
    } = config;

    this.logger = prefixLoggerDecorator(`[Polling Transport #${this.id}]`)(
      debugLoggerDecorator(debug)(logger),
    );

    this.queue = [];
    this.emitter = new EventEmitter();
    this.readyState = 'connecting';

    this.socket = eioClient(endpoint, {
      path,
      transports: ['polling'],
    });
    this.socket.binaryType = 'arraybuffer';

    this.bindSocketEvent('open', () =>
      this.handleSocketOpen(heartbeatInterval),
    );

    this.bindSocketEvent('close', () => {
      this.readyState = 'closed';
      this.logger.log('Closed connection');
      this.emitter.emit(
        'error',
        new RpcError(
          'CONNECTION_ERROR',
          'Connection closed normally by the server.',
        ),
      );
      this.close();
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
          new RpcError(
            'SERIALIZATION_MISMATCH',
            'Incoming message should be ArrayBuffer',
          ),
        );
      }
    });

    this.bindSocketEvent('error', (error) => {
      this.logger.log('Closing by error', error);

      this.emitter.emit(
        'error',
        new RpcError('CONNECTION_CLOSED', 'Transport error'),
      );

      this.close();
    });

    this.emitter.on('end', () => {
      this.logger.log('Ended connection');

      this.readyState = 'closed';

      this.emitter.removeAllListeners();

      if (this.cancelHeartbeat) {
        this.cancelHeartbeat();
        this.cancelHeartbeat = undefined;
      }

      this.socket = undefined;
    });
  }

  getReadyState(): TransportReadyState {
    return this.readyState;
  }

  private setupHeartbeat(interval: number): () => void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timerId: any;

    const check = () => {
      this.logger.log('Is alive', this.isAlive);

      if (this.isAlive) {
        this.isAlive = false;
        this.ping(() => {
          timerId = setTimeout(check, interval);
        });
      } else {
        this.emitter.emit(
          'error',
          new RpcError(
            'SERVER_CLOSED_CONNECTION',
            "Server doesn't respond on client pings. That means server closed connection on their side.",
          ),
        );

        this.close();
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

  ping(callback?: () => void): void {
    this.logger.log('Send ping');
    this.socket?.send(PING);
    callback?.();
  }

  pong(): void {
    this.logger.log('Send pong');
    this.socket?.send(PONG);
  }

  handleSocketOpen(heartbeatInterval: number): void {
    this.logger.log('Connection opened');
    this.isAlive = true;
    this.readyState = 'open';
    this.socket?.send(new Uint8Array([1, 0]));
    this.emitter.emit('open');

    this.cancelHeartbeat = this.setupHeartbeat(heartbeatInterval);

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

  onError(handler: (error: RpcError) => void): Unbind {
    return bindEvent(this.emitter, 'error', handler);
  }

  onClose(handler: () => void): Unbind {
    return bindEvent(this.emitter, 'end', handler);
  }

  close(): void {
    if (this.cancelHeartbeat) {
      this.logger.log('Stopping heartbeat...');
      this.cancelHeartbeat();
      this.cancelHeartbeat = undefined;
    }

    if (this.socket) {
      this.logger.log('Closing socket...');

      this.socketSubscriptions.forEach((teardown) => teardown());
      this.socket.close();
      this.socket = undefined;
      this.socketSubscriptions = [];

      this.logger.log('Closed connection');
    }

    this.emitter.emit('end');
    this.emitter.removeAllListeners();
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
          new RpcError('CONNECTION_CLOSED', 'Connection closed'),
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
