// Copyright 2018 dialog LLC <info@dlg.im>

import { createNanoEvents, Emitter, Unsubscribe } from 'nanoevents';
import {
  ClientStreamCall as IClientStreamCall,
  RpcCall,
  StreamRequest,
  UnaryRequest,
} from './types';
import { Transport } from './transport';
import { createSequence, Sequence } from './utils/sequence';
import { RpcError } from './RpcError';
import { IRpcClient } from './IRpcClient';
import { UnaryCall } from './UnaryCall';
import { ServerStreamCall } from './ServerStreamCall';
import { BidiStreamCall } from './BidiStreamCall';
import { ClientStreamCall } from './ClientStreamCall';

export class RpcClient implements IRpcClient<RpcCall, IClientStreamCall> {
  transport: Transport | undefined;
  calls: Map<string, RpcCall>;
  seq: Sequence;
  emitter: Emitter<{ error: (error: RpcError) => void }>;

  constructor(transport: Transport) {
    this.calls = new Map();
    this.seq = createSequence();
    this.emitter = createNanoEvents();
    this.setTransport(transport);
  }

  setTransport(transport: Transport): void {
    this.transport = transport;
    this.transport.onError((error) => {
      this.emitter.emit('error', error);
    });
  }

  cancelRequest(id: string): void {
    const call = this.calls.get(id);

    if (call) {
      call.cancel();
    }
  }

  disposeRequest(id: string): void {
    this.calls.delete(id);
  }

  makeUnaryRequest(request: UnaryRequest): UnaryCall {
    if (!this.transport) {
      throw new Error('Transport is not set');
    }

    const id = this.seq.next();

    const call = new UnaryCall(id, this.transport);
    this.calls.set(call.id, call);

    call.onEnd(() => this.disposeRequest(call.id));
    call.onCancel(() => this.disposeRequest(call.id));

    setImmediate(() => {
      call.start(request);
    });

    return call;
  }

  makeServerStreamRequest(request: UnaryRequest): ServerStreamCall {
    if (!this.transport) {
      throw new Error('Transport is not set');
    }

    const id = this.seq.next();

    const call = new ServerStreamCall(id, this.transport);
    this.calls.set(call.id, call);

    call.onEnd(() => this.disposeRequest(call.id));
    call.onCancel(() => this.disposeRequest(call.id));

    setImmediate(() => {
      call.start(request);
    });

    return call;
  }

  makeClientStreamRequest(request: StreamRequest): ClientStreamCall {
    if (!this.transport) {
      throw new Error('Transport is not set');
    }

    const id = this.seq.next();

    const call = new ClientStreamCall(id, this.transport);
    this.calls.set(call.id, call);

    call.onEnd(() => this.disposeRequest(call.id));
    call.onCancel(() => this.disposeRequest(call.id));

    setImmediate(() => {
      call.start(request);
    });

    return call;
  }

  makeBidiStreamRequest(request: StreamRequest): BidiStreamCall {
    if (!this.transport) {
      throw new Error('Transport is not set');
    }

    const id = this.seq.next();

    const call = new BidiStreamCall(id, this.transport);
    this.calls.set(call.id, call);

    call.onEnd(() => this.disposeRequest(call.id));
    call.onCancel(() => this.disposeRequest(call.id));

    setImmediate(() => {
      call.start(request);
    });

    return call;
  }

  onError(errorHandler: (error: RpcError) => void): Unsubscribe {
    return this.emitter.on('error', errorHandler);
  }
}
