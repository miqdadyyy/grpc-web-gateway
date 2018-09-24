/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Emitter } from 'kefir';
import { type RpcCall, type WriteRpcTransport, type UnaryRequest } from './types';
import { Request, type Response } from '../shared/signaling';

class UnaryCall implements RpcCall {
  transport: WriteRpcTransport;
  emitter: Emitter<Uint8Array, Error>;

  constructor(transport: WriteRpcTransport, emitter: Emitter<Uint8Array, Error>) {
    this.transport = transport;
    this.emitter = emitter;
  }

  start(id: string, { service, method, payload, metadata }: UnaryRequest) {
    const message = Request.encode({ id, unary: { service, method, payload, metadata } }).finish();
    this.transport.send(message);
  }

  cancel(id: string) {
    const message = Request.encode({ id, cancel: {} }).finish();
    this.transport.send(message);
  }

  onMessage(message: Response) {
    if (message.unary) {
      this.emitter.value(message.unary.payload);
      this.emitter.end();
    }
  }
}

export default UnaryCall;
