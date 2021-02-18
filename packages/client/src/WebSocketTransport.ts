// Copyright 2018 dialog LLC <info@dlg.im>

import { debugLoggerDecorator, Logger, prefixLoggerDecorator } from './Logger';
import {
  StatusfulTransport,
  TransportError,
  TransportReadyState,
} from './transport';
import EventEmitter from 'eventemitter3';
import { Unbind } from './types';
import { bindEvent } from './utils/emitterUtils';
import {
  SOCKET_CLOSE_CODE_HEARTBEAT_ERROR,
  SOCKET_CLOSE_CODE_NORMAL,
  SOCKET_CLOSE_CODE_SERIALIZATION_ERROR,
  SOCKET_CLOSE_CODE_TRANSPORT_ERROR,
  SERVICE_PING_MESSAGE,
} from './transportUtils';

export type WebSocketTransportConfig = {
  heartbeatInterval?: number;
  logger?: Logger;
  debug?: boolean;
};

const DEFAULT_HEARTBEAT_INTERVAL = 30000;

let globalId = 0;

export class WebSocketTransport implements StatusfulTransport {
  private id = ++globalId;

  private queue: Array<Uint8Array>;
  private socket: WebSocket | undefined;
  private readonly emitter: EventEmitter<{
    open: [];
    message: [Uint8Array];
    error: [TransportError];
    close: [];
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

    this.bindSocketEvent('open', () =>
      this.handleSocketOpen(heartbeatInterval),
    );

    this.bindSocketEvent('close', () => {
      this.logger.log('Connection was closed');
      this.closeSocket();
    });

    this.bindSocketEvent('error', (event: Event) => {
      this.logger.log('Socket error', event);
      this.emitter.emit('error', new TransportError('Socket error'));
      this.closeSocket(SOCKET_CLOSE_CODE_TRANSPORT_ERROR);
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
      this.logger.log('Heartbeat', this.isAlive);

      if (this.isAlive) {
        this.isAlive = false;
        this.sendPing();
        timerId = setTimeout(check, interval);
      } else {
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
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.logger.log('Send ping');
      this.socket?.send(SERVICE_PING_MESSAGE);
    }
  }

  private handleSocketOpen(heartbeatInterval: number): void {
    this.logger.log('Connection opened');
    this.isAlive = true;
    this.sendPing();
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
          new TransportError('Failed to send to the closed connection'),
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

  private closeSocket(code?: number) {
    if (this.cancelHeartbeat) {
      this.logger.log('Stopping heartbeat...');
      this.cancelHeartbeat();
      this.cancelHeartbeat = undefined;
    }

    if (this.socket) {
      this.logger.log(`Closing socket ${code ? `(${code})` : ''}...`);

      this.socketSubscriptions.forEach((teardown) => teardown());

      const { readyState } = this.socket;
      if (readyState !== WebSocket.CLOSING && readyState !== WebSocket.CLOSED) {
        this.socket.close(code);
      }

      this.socket = undefined;
      this.socketSubscriptions = [];

      this.logger.log('Closed socket');
    }

    this.emitter.emit('close');
    this.emitter.removeAllListeners();
  }
}
