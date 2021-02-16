// Copyright 2018 dialog LLC <info@dlg.im>

import { Request } from '@dlghq/grpc-web-gateway-signaling';
import { debugLoggerDecorator, Logger, prefixLoggerDecorator } from './Logger';
import { StatusfulTransport, TransportReadyState } from './transport';
import { RpcError } from './RpcError';
import EventEmitter from 'eventemitter3';
import { Unbind } from './types';
import { bindEvent } from './utils/emitterUtils';

export type WebSocketTransportConfig = {
  heartbeatInterval?: number;
  logger?: Logger;
  debug?: boolean;
};

const PING = Request.encode({ id: 'service', service: { ping: {} } }).finish();
const PONG = Request.encode({ id: 'service', service: { pong: {} } }).finish();

const DEFAULT_HEARTBEAT_INTERVAL = 30000;

const WEBSOCKET_STATUS_CODE_NORMAL_CLOSURE = 1000;
const WEBSOCKET_STATUS_CODE_PROTOCOL_ERROR = 1002;
const WEBSOCKET_STATUS_CODE_ABNORMAL_CLOSURE = 1006;

let globalId = 0;

export class WebSocketTransport implements StatusfulTransport {
  private id = ++globalId;

  private queue: Array<Uint8Array>;
  private socket: WebSocket | undefined;
  private emitter: EventEmitter<{
    open: [];
    message: [Uint8Array];
    error: [RpcError];
    end: [];
  }>;
  private readonly logger: Logger;
  private cancelHeartbeat?: () => void;
  private isAlive = false;
  private socketSubscriptions: Array<() => void> = [];

  constructor(endpoint: string, config: WebSocketTransportConfig = {}) {
    const {
      heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL,
      debug = false,
      logger = console,
    } = config;

    this.logger = prefixLoggerDecorator(`[WS Transport #${this.id}]`)(
      debugLoggerDecorator(debug)(logger),
    );

    this.queue = [];
    this.emitter = new EventEmitter();

    this.socket = new WebSocket(endpoint);
    this.socket.binaryType = 'arraybuffer';

    this.bindSocketEvent('open', () => this.handleSocketOpen(heartbeatInterval));

    this.bindSocketEvent('close', () => {
      this.logger.log('Closed connection');
      this.emitter.emit(
        'error',
        new RpcError(
          'CONNECTION_ERROR',
          'Connection closed normally by the server.',
        ),
      );
      this.close(WEBSOCKET_STATUS_CODE_NORMAL_CLOSURE);
    });

    this.bindSocketEvent('message', (event: MessageEvent) => {
      this.logger.log('Message', event.data, event);
      this.isAlive = true;

      if (event.data instanceof ArrayBuffer) {
        const message = new Uint8Array(event.data);
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

    this.bindSocketEvent('error', (event: Event) => {
      this.logger.log('Closing by error', event);

      this.emitter.emit(
        'error',
        new RpcError('CONNECTION_CLOSED', 'Transport error'),
      );

      this.close(WEBSOCKET_STATUS_CODE_ABNORMAL_CLOSURE);
    });
  }

  getReadyState(): TransportReadyState {
    if (!this.socket) {
      return 'closed';
    }

    switch (this.socket.readyState) {
      case 0:
        return 'connecting';
      case 1:
        return 'open';
      case 2:
        return 'closing';
      case 3:
      default:
        return 'closed';
    }
  }

  private setupHeartbeat(interval: number): Unbind {
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

        this.close(WEBSOCKET_STATUS_CODE_PROTOCOL_ERROR);
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

  private handleSocketOpen(heartbeatInterval: number): void {
    this.logger.log('Connection opened');
    this.isAlive = true;
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

  close(code?: number): void {
    if (this.cancelHeartbeat) {
      this.logger.log('Stopping heartbeat...');
      this.cancelHeartbeat();
      this.cancelHeartbeat = undefined;
    }

    if (this.socket) {
      this.logger.log('Closing socket...');

      this.socketSubscriptions.forEach((teardown) => teardown());
      this.socket.close(code);
      this.socket = undefined;
      this.socketSubscriptions = [];

      this.logger.log('Closed connection');
    }

    this.emitter.emit('end');
    this.emitter.removeAllListeners();
  }

  send(message: Uint8Array): void {
    switch (this.socket?.readyState) {
      case WebSocket.CONNECTING:
        this.queue.push(message);
        break;

      case WebSocket.OPEN:
        this.socket?.send(message);
        break;

      default:
        this.emitter.emit(
          'error',
          new RpcError('CONNECTION_CLOSED', 'Connection closed'),
        );
    }
  }

  private bindSocketEvent<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => void,
  ) {
    if (this.socket) {
      this.socket.addEventListener(type, listener);
      this.socketSubscriptions.push(() =>
        this.socket?.removeEventListener(type, listener),
      );
    }
  }
}
