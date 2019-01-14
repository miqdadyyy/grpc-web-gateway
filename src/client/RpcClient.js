/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import Kefir, { constant, stream, type Observable } from 'kefir';
import obs from 'kefir/src/observable';
import type EventEmitter from 'events';

import type { RpcTransport, RpcCall, UnaryRequest } from './types';
import { type RpcDuplexTransport, type Transport } from './transport';
import { generateId, createSequence } from '../utils/sequence';
import { Request, Response } from '../shared/signaling';
import UnaryCall from './UnaryCall';
import ServerStreamCall from './ServerStreamCall';

type ServerStream = {
  stream(): Observable<Uint8Array, Error>,
};

type ClientStream = {
  push(Uint8Array): void,
};

class RpcClient {
  transport: Transport;
  calls: Map<string, RpcCall>;

  constructor(transport: Transport) {
    this.transport = transport;
    this.calls = new Map();

    const seq = createSequence();

    this.transport.onError(error => {
      console.log('error:', error);
    });
  }

  cancelRequest(id: string) {
    const call = this.calls.get(id);
  }

  makeUnaryRequest(request: UnaryRequest) {
    console.log('Make unary request', request);

    const call = new UnaryCall(this.transport);
    this.calls.set(call.id, call);

    return call
      .start(request)
      .then(response => {
        console.log('Call completed', response);
        return response;
      })
      .finally(() => this.calls.delete(call.id));
  }

  makeServerStreamRequest(request: UnaryRequest) {
    return Kefir.stream(emitter => {
      const id = generateId();

      const call = new ServerStreamCall(this.transport, emitter);
      this.calls.set(id, call);

      call.start(id, request);

      return () => {
        call.cancel(id);
        this.calls.delete(id);
      };
    });
  }

  makeClientStreamRequest() {}

  makeBidiStreamRequest() {}

  stop() {}
}

export default RpcClient;
