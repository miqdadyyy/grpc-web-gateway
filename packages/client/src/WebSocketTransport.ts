// Copyright 2018 dialog LLC <info@dlg.im>

import { debugLoggerDecorator, Logger, prefixLoggerDecorator } from './Logger';
import {
  HeartbeatError,
  IntervalOrProviderFn,
  StatusfulTransport,
  TransportError,
  TransportReadyState,
} from './transport';
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

export type WebSocketTransportConfig = {
  heartbeatInterval?: number;
  suspendedHeartbeatInterval?: IntervalOrProviderFn;
  logger?: Logger;
  debug?: boolean;
};

const DEFAULT_HEARTBEAT_INTERVAL = 30000;

let globalId = 0;

export class WebSocketTransport implements StatusfulTransport {
  private readonly id = ++globalId;
  private readonly heartbeatInterval: number;
  private readonly suspendedHeartbeatInterval: IntervalOrProviderFn;

  private queue: Array<Uint8Array>;
  private socket: WebSocket | undefined;
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
  private socketSubscriptions: Array<() => void> = [];

  constructor(endpoint: string, config: WebSocketTransportConfig = {}) {
    const {
      heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL,
      suspendedHeartbeatInterval = DEFAULT_SUSPENDED_HEARTBEAT_INTERVAL,
      debug = false,
      logger = console,
    } = config;

    this.heartbeatInterval = heartbeatInterval;
    this.suspendedHeartbeatInterval = suspendedHeartbeatInterval;

    this.logger = prefixLoggerDecorator(`[WS Transport #${this.id}]`)(
      debugLoggerDecorator(debug)(logger),
    );

    this.queue = [];
    this.emitter = new EventEmitter();

    this.socket = new WebSocket(endpoint);
    this.socket.binaryType = 'arraybuffer';

    this.bindSocketEvent('open', () => this.handleSocketOpen());

    this.bindSocketEvent('close', () => {
      this.logger.log('Connection was closed');
      this.closeSocket();
    });

    this.bindSocketEvent('error', (event: Event) => {
      this.logger.log('Socket error', event);
      this.emitter.emit('error', new TransportError('Socket error'));
      this.emitReadyState();
    });

    this.bindSocketEvent('message', (event: MessageEvent) => {
      this.logger.log('Message', event.data, event);

      this.hasResponse = true;
      if (this.isSuspended) {
        this.isSuspended = false;
        this.emitter.emit('readyState', 'open');
      }

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
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return this.isSuspended ? 'suspended' : 'open';
      case WebSocket.CLOSING:
        return 'closing';
      case WebSocket.CLOSED:
      default:
        return 'closed';
    }
  }

  private emitReadyState() {
    this.emitter.emit('readyState', this.getReadyState());
  }

  private setupHeartbeat(): Unbind {
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

  private handleSocketOpen(): void {
    this.logger.log('Connection opened');
    this.hasResponse = true;
    this.isSuspended = false;
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

    this.emitReadyState();
    this.emitter.emit('close');
    this.emitter.removeAllListeners();
  }
}
