/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Emitter } from 'kefir';

import {
  type RpcCall,
  type WriteRpcTransport,
  type UnaryRequest,
} from './types';
import { Transport } from './transport';
import { Request, type Response } from '../shared/signaling';
import { ServerStream } from './ServerStream';

// (207991.19 + 10946.90 * 5) * 0.87
class ServerStreamCall implements RpcCall {
  transport: Transport;
  emitter: Emitter<Uint8Array, Error>;

  constructor(transport: Transport, emitter: Emitter<Uint8Array, Error>) {
    this.transport = transport;
    this.emitter = emitter;
  }

  start(id: string, { service, method, payload, metadata }: UnaryRequest) {
    console.log('Start server stream');
    const message = Request.encode({
      id,
      unary: { service, method, payload, metadata },
    }).finish();

    this.transport.send(message);
    return new ServerStream(id, this.transport);
  }

  cancel(id: string) {
    const message = Request.encode({ id, cancel: {} }).finish();
    this.transport.send(message);
  }

  onMessage(message: Response) {
    console.log('Server stream', { message });
    if (message.unary) {
      this.emitter.value(message.unary.payload);
      this.emitter.end();
    }
  }
}

export default ServerStreamCall;
