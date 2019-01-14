/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { constant, type Emitter, type Property } from 'kefir';

import { type RpcCall, type UnaryRequest } from './types';
import { type TransportWritable, type Transport } from './transport';
import { Request, Response } from '../shared/signaling';
import { generateId } from '../utils/sequence';
import { ClientStream } from './ClientStream';

class ClientStreamCall implements RpcCall {
  id: string;
  transport: Transport;
  reject: (() => void) | null;
  stream: ClientStream;

  constructor(transport: Transport) {
    this.transport = transport;
    this.id = generateId();
    this.reject = null;
    this.stream = new ClientStream(this.id, transport);
  }

  start({ service, method }: { service: string, method: string }) {
    return new Promise<Uint8Array>((resolve, reject) => {
      const id = this.id;
      const message = Request.encode({
        id,
        stream: {},
      }).finish();
      this.transport.send(message);

      this.stream.onEnd(() => {
        const message = Request.encode({ id, end: {} }).finish();
        this.transport.send(message);
      });

      this.transport.onMessage(message => {
        const res = Response.decode(message);

        if (res.id === this.id && res.unary) {
          resolve(res.unary.payload);
          console.log(res.id);
        }
      });

      this.reject = reject;
    });
  }

  cancel() {
    const message = Request.encode({ id: this.id, cancel: {} }).finish();
    this.transport.send(message);
    if (this.reject !== null) {
      this.reject();
    }
  }

  send(message: Uint8Array) {
    this.stream.send(message);
  }

  end() {
    this.stream.end();
  }

  onMessage() {}
}

export default ClientStreamCall;
