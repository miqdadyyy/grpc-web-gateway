// Copyright 2018 dialog LLC <info@dlg.im>

import { createNanoEvents, Emitter, Unsubscribe } from 'nanoevents';
import { Request } from '@dlghq/grpc-web-gateway-signaling';
import { debugLoggerDecorator, Logger, prefixLoggerDecorator } from './Logger';
import { StatusfulTransport, TransportReadyState } from './transport';
import { RpcError } from './RpcError';
import eioClient, { Socket } from 'engine.io-client';
import { unbindAll } from './utils/emitterUtils';

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

const DEFAULT_LOGGER_PREFIX = '[Polling Transport]';

export class PollingTransport implements StatusfulTransport {
  private queue: Array<Uint8Array>;
  private socket: Socket;
  private emitter: Emitter<{
    open: () => void;
    message: (message: Uint8Array) => void;
    error: (error: RpcError) => void;
    end: () => void;
  }>;
  private isAlive: boolean;
  private readyState: TransportReadyState;
  private logger: Logger;

  constructor(endpoint: string, config: PollingTransportConfig) {
    const {
      heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL,
      debug = false,
      logger = console,
      path = DEFAULT_PATH,
    } = config;

    this.logger = prefixLoggerDecorator(DEFAULT_LOGGER_PREFIX)(
      debugLoggerDecorator(debug)(logger),
    );

    const socket = eioClient(endpoint, {
      path,
      transports: ['polling'],
    });
    socket.binaryType = 'arraybuffer';
    socket.on('open', () => this.handleOpen());

    this.queue = [];
    this.socket = socket;
    this.emitter = createNanoEvents();
    this.isAlive = false;
    this.readyState = 'connecting';

    const cancelPing = this.setupHeartbeat(heartbeatInterval);

    this.socket.on('open', () => {
      this.readyState = 'open';
    });

    this.socket.on('close', () => {
      this.readyState = 'closed';
      this.logger.log('Closed connection');
      this.emitter.emit(
        'error',
        new RpcError(
          'CONNECTION_ERROR',
          'Connection closed normally by the server.',
        ),
      );
      this.emitter.emit('end');
    });

    this.emitter.on('end', () => {
      this.logger.log('Ended connection');
      unbindAll(this.emitter);
      cancelPing();
    });

    this.socket.on('message', (data) => {
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
  }

  getReadyState(): TransportReadyState {
    return this.readyState;
  }

  setupHeartbeat(interval: number): () => void {
    const iid = setInterval(() => {
      this.logger.log('Is alive', this.isAlive);
      if (!this.isAlive) {
        this.emitter.emit(
          'error',
          new RpcError(
            'SERVER_CLOSED_CONNECTION',
            "Server doesn't respond on client pings. That means server closed connection on their side.",
          ),
        );

        this.socket.close();
        this.emitter.emit('end');

        return;
      }

      this.isAlive = false;
      this.ping();
    }, interval);

    return () => clearInterval(iid);
  }

  ping(): void {
    this.logger.log('Send ping');
    this.socket.send(PING);
  }

  pong(): void {
    this.logger.log('Send pong');
    this.socket.send(PONG);
  }

  handleOpen(): void {
    this.logger.log('Connection opened');
    this.isAlive = true;
    this.socket.send(new Uint8Array([1, 0]));
    this.emitter.emit('open');

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
    this.socket.close();
  }

  send(message: Uint8Array): void {
    switch (this.readyState) {
      case 'connecting':
        this.queue.push(message);
        break;

      case 'open':
        this.socket.send(message);
        break;

      default:
        this.emitter.emit(
          'error',
          new RpcError('CONNECTION_CLOSED', 'Connection closed'),
        );
    }
  }
}
