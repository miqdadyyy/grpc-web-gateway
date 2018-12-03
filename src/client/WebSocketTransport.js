/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { type RpcTransport, RpcError } from './types';
import Kefir, { type Observable } from 'kefir';

class WebSocketTransport implements RpcTransport {
  queue: Array<Uint8Array>;
  socket: WebSocket;

  constructor(endpoint: string) {
    this.queue = [];

    const socket = new WebSocket(endpoint);
    socket.binaryType = 'arraybuffer';
    socket.onopen = () => this.handleOpen();

    this.socket = socket;
  }

  handleOpen() {
    if (this.queue.length) {
      this.queue.forEach(message => this.send(message));
      this.queue = [];
    }
  }

  start(): Observable<Uint8Array, RpcError> {
    return Kefir.stream(emitter => {
      this.socket.onclose = () => emitter.end();
      this.socket.onerror = event => {
        console.error(event);
        emitter.error(new RpcError('UNKNOWN', 'WebSocket error'));
      };
      this.socket.onmessage = event => {
        if (event.data instanceof ArrayBuffer) {
          emitter.value(new Uint8Array(event.data));
        } else {
          emitter.error(
            new RpcError(
              'SERIALIZATION_MISMATCH',
              'Incoming message should be ArrayBuffer',
            ),
          );
        }
      };

      return () => this.socket.close();
    });
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
