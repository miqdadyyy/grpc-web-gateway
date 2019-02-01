// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

import Nanoevents from 'nanoevents';
import unbindAll from 'nanoevents/unbind-all';
import { Request } from '@dlghq/grpc-web-gateway-signaling';

import { type Transport } from './transport';
import { RpcError } from './RpcError';

type MessageHandler = (message: Uint8Array) => void;
type ErrorHandler = (error: RpcError) => void;
type WebSocketTransportConfig = {
  heartbeatInterval: number,
};

const PING = Request.encode({ id: 'service', service: { ping: {} } }).finish();
const PONG = Request.encode({ id: 'service', service: { pong: {} } }).finish();
const DEFAULT_HEARTBEAT_INTERVAL = 30000;

class WebSocketTransport implements Transport {
  queue: Array<Uint8Array>;
  socket: WebSocket;
  emitter: Nanoevents<{
    open: void,
    message: Uint8Array,
    error: RpcError,
    end: void,
  }>;
  isAlive: boolean;

  constructor(
    endpoint: string,
    { heartbeatInterval }: WebSocketTransportConfig = {
      heartbeatInterval: DEFAULT_HEARTBEAT_INTERVAL,
    },
  ) {
    this.queue = [];

    const socket = new WebSocket(endpoint);
    socket.binaryType = 'arraybuffer';
    socket.onopen = () => this.handleOpen();

    this.socket = socket;
    this.emitter = new Nanoevents();
    this.isAlive = false;

    const cancelPing = this.setupHeartbeat(heartbeatInterval);

    this.socket.onclose = () => {
      this.emitter.emit('end');
    };

    this.emitter.on('end', () => {
      unbindAll(this.emitter);
      cancelPing();
    });

    this.socket.onmessage = event => {
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
      if (!this.isAlive) {
        this.emitter.emit(
          'error',
          new RpcError('SERVER_CLOSED_CONNECTION', "Server doesn't respond"),
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
    this.socket.send(PING);
  }

  pong() {
    this.socket.send(PONG);
  }

  handleOpen() {
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

  onEnd(handler: void => void) {
    return this.emitter.on('end', handler);
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
        throw new Error('Connection closed');
    }
  }
}

export default WebSocketTransport;
