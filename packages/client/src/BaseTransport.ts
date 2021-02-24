// Copyright 2018 dialog LLC <info@dlg.im>

import { debugLoggerDecorator, Logger, prefixLoggerDecorator } from './Logger';
import {
  IntervalOrProviderFn,
  Transport,
  TransportError,
  TransportReadyState,
} from './transport';
import EventEmitter from 'eventemitter3';
import { Unbind } from './types';
import { bindEvent } from './utils/emitterUtils';
import {
  resolveInterval,
  SERVICE_PING_MESSAGE,
  SOCKET_CLOSE_CODE_NORMAL,
  SOCKET_CLOSE_CODE_SERIALIZATION_ERROR,
} from './transportUtils';

let globalId = 0;

export abstract class BaseTransport implements Transport {
  protected readonly id = ++globalId;

  protected readonly heartbeatInterval: number;
  protected readonly suspendedHeartbeatInterval: IntervalOrProviderFn;
  protected readonly logger: Logger;

  protected readonly emitter: EventEmitter<{
    open: [];
    message: [Uint8Array];
    error: [TransportError];
    close: [];
    readyState: [TransportReadyState];
  }> = new EventEmitter();

  private queue: Array<Uint8Array> = [];
  private cancelHeartbeat?: () => void;
  private hasResponse = false;
  private isSuspended = false;

  protected constructor(config: {
    heartbeatInterval: number;
    suspendedHeartbeatInterval: IntervalOrProviderFn;
    debug: boolean;
    logger: Logger;
    loggerTag: string;
  }) {
    this.heartbeatInterval = config.heartbeatInterval;
    this.suspendedHeartbeatInterval = config.suspendedHeartbeatInterval;
    this.logger = prefixLoggerDecorator(`[${config.loggerTag} #${this.id}]`)(
      debugLoggerDecorator(config.debug)(config.logger),
    );
  }

  abstract getReadyState(): TransportReadyState;

  protected abstract sendToSocket(message: Uint8Array): void;

  protected abstract closeSocket(code?: number): void;

  onOpen(handler: () => void): Unbind {
    return bindEvent(this.emitter, 'open', handler);
  }

  onReadyState(handler: (readyState: TransportReadyState) => void): Unbind {
    return bindEvent(this.emitter, 'readyState', handler);
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

  send(message: Uint8Array): void {
    switch (this.getReadyState()) {
      case 'connecting':
        this.queue.push(message);
        break;

      case 'open':
        this.sendToSocket(message);
        break;

      default:
        this.emitter.emit(
          'error',
          new TransportError('Failed to send to the closed connection'),
        );
    }
  }

  ping(): void {
    const readyState = this.getReadyState();
    if (readyState === 'open' || readyState === 'suspended') {
      this.logger.log('Send ping');
      this.sendToSocket(SERVICE_PING_MESSAGE);
    }
  }

  close(): void {
    this.closeTransport(SOCKET_CLOSE_CODE_NORMAL);
  }

  protected getIsSuspended(): boolean {
    return this.isSuspended;
  }

  protected handleSocketOpen(): void {
    this.logger.log('Connection opened');
    this.hasResponse = true;
    this.isSuspended = false;
    this.cancelHeartbeat = this.setupHeartbeat();

    this.emitter.emit('open');
    this.emitCurrentReadyState();

    if (this.queue.length) {
      this.queue.forEach((message) => this.send(message));
      this.queue = [];
    }
  }

  protected handleSocketClose(): void {
    this.logger.log('Connection was closed');
    this.closeTransport();
  }

  protected handleSocketError(): void {
    this.emitter.emit('error', new TransportError('Socket error'));
    this.emitCurrentReadyState();
  }

  protected handleSocketMessage(data: ArrayBuffer | unknown): void {
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
      this.closeTransport(SOCKET_CLOSE_CODE_SERIALIZATION_ERROR);
    }
  }

  private emitCurrentReadyState() {
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
          this.emitCurrentReadyState();
        }

        this.emitCurrentReadyState();
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

  private closeTransport(code?: number) {
    if (this.cancelHeartbeat) {
      this.logger.log('Stopping heartbeat...');
      this.cancelHeartbeat();
      this.cancelHeartbeat = undefined;
    }

    this.closeSocket(code);

    this.emitCurrentReadyState();
    this.emitter.emit('close');
    this.emitter.removeAllListeners();
  }
}
