/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import Kefir, { constant, stream, type Observable } from 'kefir';
import obs from 'kefir/src/observable';
import type EventEmitter from 'events';

import type {
  RpcTransport,
  RpcCall,
  UnaryRequest,
  StreamRequest,
} from './types';
import { type RpcDuplexTransport, type Transport } from './transport';
import { createSequence, type Sequence } from '../utils/sequence';
import { Request, Response } from '../shared/signaling';
import UnaryCall from './UnaryCall';
import ServerStreamCall from './ServerStreamCall';
import BidiStreamCall from './BidiStreamCall';
import ClientStreamCall from './ClientStreamCall';

class RpcClient {
  transport: Transport;
  calls: Map<string, RpcCall>;
  seq: Sequence;

  constructor(transport: Transport) {
    this.transport = transport;
    this.calls = new Map();
    this.seq = createSequence();

    this.transport.onError(error => {
      console.log('error:', error);
    });
  }

  cancelRequest(id: string) {
    const call = this.calls.get(id);
  }

  makeUnaryRequest(request: UnaryRequest) {
    const id = this.seq.next();
    console.log('Make unary request', { request, id });

    const call = new UnaryCall(id, this.transport);
    this.calls.set(call.id, call);

    call.start(request).onEnd(() => {
      this.calls.delete(call.id);
      this.seq.deleteId(call.id);
    });

    return call;
  }

  makeServerStreamRequest(request: UnaryRequest) {
    const id = this.seq.next();
    console.log('Make server stream request', { request, id });

    const call = new ServerStreamCall(id, this.transport);
    this.calls.set(call.id, call);

    call.start(request).onEnd(() => {
      this.calls.delete(call.id);
      this.seq.deleteId(call.id);
    });

    return call;
  }

  makeClientStreamRequest(request: StreamRequest) {
    const id = this.seq.next();
    console.log('Make client stream request', { request, id });

    const call = new ClientStreamCall(id, this.transport);
    this.calls.set(call.id, call);

    call.start(request).onEnd(() => {
      this.calls.delete(call.id);
      this.seq.deleteId(call.id);
    });

    return call;
  }

  makeBidiStreamRequest(request: StreamRequest) {
    const id = this.seq.next();
    console.log('Make bidi stream request', { request, id });

    const call = new BidiStreamCall(id, this.transport);
    this.calls.set(call.id, call);

    call.start(request).onEnd(() => {
      this.calls.delete(call.id);
      this.seq.deleteId(call.id);
    });

    return call;
  }

  stop() {}
}

export default RpcClient;
