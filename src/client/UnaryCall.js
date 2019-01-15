/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { constant, type Emitter, type Property } from 'kefir';

import { type RpcCall, type UnaryRequest } from './types';
import { type TransportWritable, type Transport } from './transport';
import { Request, Response } from '../shared/signaling';

class F<T> {
  constructor(value: T) {}
}

class UnaryCall implements RpcCall {
  id: string;
  transport: Transport;
  reject: (() => void) | null;

  constructor(id: string, transport: Transport) {
    this.transport = transport;
    this.id = id;
    this.reject = null;
  }

  start({ service, method, payload, metadata }: UnaryRequest) {
    return new Promise<Uint8Array>((resolve, reject) => {
      const id = this.id;
      const message = Request.encode({
        id,
        unary: { service, method, payload, metadata },
      }).finish();
      this.transport.send(message);
      this.reject = reject;

      this.transport.onMessage(message => {
        const res = Response.decode(message);

        if (res.id === this.id && res.unary) {
          resolve(res.unary.payload);
          console.log(res.id);
        }
      });
    });
  }

  cancel() {
    const message = Request.encode({ id: this.id, cancel: {} }).finish();
    this.transport.send(message);
    if (this.reject !== null) {
      this.reject();
    }
  }

  onMessage(message: Response) {}
}

export default UnaryCall;
