/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import Nanoevents from 'nanoevents';

import type { RpcCall, UnaryRequest, StreamRequest } from './types';
import { type Transport } from './transport';
import { createSequence, type Sequence } from '../utils/sequence';
import { RpcError } from './RpcError';

import UnaryCall from './UnaryCall';
import ServerStreamCall from './ServerStreamCall';
import BidiStreamCall from './BidiStreamCall';
import ClientStreamCall from './ClientStreamCall';

class RpcClient {
  transport: Transport;
  calls: Map<string, RpcCall>;
  seq: Sequence;
  emitter: Nanoevents<{ error: RpcError }>;

  constructor(transport: Transport) {
    this.transport = transport;
    this.calls = new Map();
    this.seq = createSequence();
    this.emitter = new Nanoevents();

    this.transport.onError(error => {
      this.emitter.emit('error', error);
    });
  }

  cancelRequest(id: string) {
    const call = this.calls.get(id);

    if (call) call.cancel();
  }

  makeUnaryRequest(request: UnaryRequest) {
    const id = this.seq.next();

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

    const call = new BidiStreamCall(id, this.transport);
    this.calls.set(call.id, call);

    call.start(request).onEnd(() => {
      this.calls.delete(call.id);
      this.seq.deleteId(call.id);
    });

    return call;
  }

  onError(errorHandler: RpcError => void) {
    this.emitter.on('error', errorHandler);
  }
}

export default RpcClient;
