// @flow strict

// Copyright 2018 dialog LLC <info@dlg.im>

import Nanoevents from 'nanoevents';
import unbindAll from 'nanoevents/unbind-all';
import { Request } from '@dlghq/grpc-web-gateway-signaling';

import {
  type Logger,
  debugLoggerDecorator,
  prefixLoggerDecorator,
} from './Logger';
import { type StatusfulTransport } from './transport';
import { RpcError } from './RpcError';

type MessageHandler = (message: Uint8Array) => void;
type ErrorHandler = (error: RpcError) => void;
type WebSocketTransportConfig = {
  heartbeatInterval?: number,
  logger?: Logger,
  debug?: boolean,
};

const PING = Request.encode({ id: 'service', service: { ping: {} } }).finish();
const PONG = Request.encode({ id: 'service', service: { pong: {} } }).finish();
const DEFAULT_HEARTBEAT_INTERVAL = 30000;

const DEFAULT_LOGGER_PREFIX = '[WS Transport]';

class WebSocketTransport implements StatusfulTransport {
  queue: Array<Uint8Array>;
  socket: WebSocket;
  emitter: Nanoevents<{
    open: void,
    message: Uint8Array,
    error: RpcError,
    end: void,
  }>;
  isAlive: boolean;
  logger: Logger;
  debug: boolean;

  constructor(
    endpoint: string,
    {
      heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL,
      debug = false,
      logger = console,
    }: WebSocketTransportConfig = {},
  ) {
    this.logger = prefixLoggerDecorator(DEFAULT_LOGGER_PREFIX)(
      debugLoggerDecorator(debug)(logger),
    );

    const socket = new WebSocket(endpoint);
    socket.binaryType = 'arraybuffer';
    socket.onopen = () => this.handleOpen();
    this.queue = [];
    this.socket = socket;
    this.emitter = new Nanoevents();
    this.isAlive = false;

    const cancelPing = this.setupHeartbeat(heartbeatInterval);

    this.socket.onclose = () => {
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

    this.emitter.on('end', () => {
      this.logger.log('Ended connection');
      unbindAll(this.emitter);
      cancelPing();
    });

    this.socket.onmessage = event => {
      this.logger.log('Message', event.data, event);
      this.isAlive = true;
      if (event.data instanceof ArrayBuffer) {
        const message = new Uint8Array(
          // Flow hack to refine event.data type
          (event.data: ArrayBuffer),
        );

        this.emitter.emit(
          'message',
          new Uint8Array(
            // Flow hack to refine event.data type
            message,
          ),
        );
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
  }

  setupHeartbeat(interval: number) {
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

  ping() {
    this.logger.log('Send ping');
    this.socket.send(PING);
  }

  pong() {
    this.logger.log('Send pong');
    this.socket.send(PONG);
  }

  handleOpen() {
    this.logger.log('Connection opened');
    this.isAlive = true;
    this.socket.send(new Uint8Array([1, 0]));
    this.emitter.emit('open');

    if (this.queue.length) {
      this.queue.forEach(message => this.send(message));
      this.queue = [];
    }
  }

  onOpen(handler: () => void) {
    return this.emitter.on('open', handler);
  }

  onMessage(handler: MessageHandler) {
    return this.emitter.on('message', handler);
  }

  onError(handler: ErrorHandler) {
    return this.emitter.on('error', handler);
  }

  onClose(handler: void => void) {
    return this.emitter.on('end', handler);
  }

  close() {
    return this.socket.close();
  }

  send(message: Uint8Array): void {
    switch (this.socket.readyState) {
      case WebSocket.CONNECTING:
        this.queue.push(message);
        break;

      case WebSocket.OPEN:
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

export default WebSocketTransport;
