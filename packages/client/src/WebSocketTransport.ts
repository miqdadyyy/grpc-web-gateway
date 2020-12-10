// Copyright 2018 dialog LLC <info@dlg.im>

import { createNanoEvents, Emitter, Unsubscribe } from 'nanoevents';
import { Request } from '@dlghq/grpc-web-gateway-signaling';
import { debugLoggerDecorator, Logger, prefixLoggerDecorator } from './Logger';
import { StatusfulTransport, TransportReadyState } from './transport';
import { RpcError } from './RpcError';
import { unbindAll } from './utils/emitterUtils';

export type WebSocketTransportConfig = {
  heartbeatInterval?: number;
  logger?: Logger;
  debug?: boolean;
};

const PING = Request.encode({ id: 'service', service: { ping: {} } }).finish();
const PONG = Request.encode({ id: 'service', service: { pong: {} } }).finish();
const DEFAULT_HEARTBEAT_INTERVAL = 30000;

const DEFAULT_LOGGER_PREFIX = '[WS Transport]';

export class WebSocketTransport implements StatusfulTransport {
  private queue: Array<Uint8Array>;
  private socket: WebSocket | undefined;
  private emitter: Emitter<{
    open: () => void;
    message: (message: Uint8Array) => void;
    error: (error: RpcError) => void;
    end: () => void;
  }>;
  private isAlive: boolean;
  private logger: Logger;
  private cancelHeartbeat?: () => void;

  constructor(
    endpoint: string,
    {
      heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL,
      debug = false,
      logger = console,
    }: WebSocketTransportConfig = {
      heartbeatInterval: DEFAULT_HEARTBEAT_INTERVAL,
      debug: false,
      logger: console,
    },
  ) {
    this.logger = prefixLoggerDecorator(DEFAULT_LOGGER_PREFIX)(
      debugLoggerDecorator(debug)(logger),
    );

    this.queue = [];
    this.emitter = createNanoEvents();
    this.isAlive = false;

    this.socket = new WebSocket(endpoint);
    this.socket.binaryType = 'arraybuffer';

    const onOpen = () => this.handleOpen(heartbeatInterval);
    this.socket.addEventListener('open', onOpen);

    const onClose = () => {
      this.logger.log('Closed connection');
      this.emitter.emit(
        'error',
        new RpcError(
          'CONNECTION_ERROR',
          'Connection closed normally by the server.',
        ),
      );
      this.emitter.emit('end');
    };
    this.socket.addEventListener('close', onClose);

    const onMessage = (event: MessageEvent) => {
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
    };
    this.socket.addEventListener('message', onMessage);

    this.emitter.on('end', () => {
      this.logger.log('Ended connection');

      unbindAll(this.emitter);

      if (this.cancelHeartbeat) {
        this.cancelHeartbeat();
        this.cancelHeartbeat = undefined;
      }

      this.socket?.removeEventListener('open', onOpen);
      this.socket?.removeEventListener('close', onClose);
      this.socket?.removeEventListener('message', onMessage);
      this.socket = undefined;
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

  setupHeartbeat(interval: number): () => void {
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

        this.socket?.close();
        this.emitter.emit('end');
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

  handleOpen(heartbeatInterval: number): void {
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

  onOpen(handler: () => void): Unsubscribe {
    return this.emitter.on('open', handler);
  }

  onMessage(handler: (message: Uint8Array) => void): Unsubscribe {
    return this.emitter.on('message', handler);
  }

  onError(handler: (error: RpcError) => void): Unsubscribe {
    return this.emitter.on('error', handler);
  }

  onClose(handler: () => void): Unsubscribe {
    return this.emitter.on('end', handler);
  }

  close(): void {
    this.socket?.close();
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
}
