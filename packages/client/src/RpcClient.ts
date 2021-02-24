// Copyright 2018 dialog LLC <info@dlg.im>

import {
  ClientStreamCall as IClientStreamCall,
  RpcCall,
  StreamRequest,
  UnaryRequest,
  Unbind,
} from './types';
import { Transport } from './transport';
import { createSequence, Sequence } from './utils/sequence';
import { createClientTransportRpcError, RpcError } from './RpcError';
import { IRpcClient } from './IRpcClient';
import { UnaryCall } from './UnaryCall';
import { ServerStreamCall } from './ServerStreamCall';
import { BidiStreamCall } from './BidiStreamCall';
import { ClientStreamCall } from './ClientStreamCall';
import EventEmitter from 'eventemitter3';
import { bindEvent } from './utils/emitterUtils';

export class RpcClient implements IRpcClient<RpcCall, IClientStreamCall> {
  transport: Transport | undefined;
  seq: Sequence;
  emitter: EventEmitter<{ error: [RpcError] }>;

  constructor(transport: Transport) {
    this.seq = createSequence();
    this.emitter = new EventEmitter();
    this.setTransport(transport);
  }

  setTransport(transport: Transport): void {
    this.transport = transport;
    this.transport.onError((error) => {
      this.emitter.emit('error', createClientTransportRpcError(error));
    });
  }

  makeUnaryRequest(request: UnaryRequest): UnaryCall {
    if (!this.transport) {
      throw new Error('Transport is not set');
    }

    const id = this.seq.next();
    const call = new UnaryCall(id, this.transport);

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

    setImmediate(() => {
      call.start(request);
    });

    return call;
  }

  onError(handler: (error: RpcError) => void): Unbind {
    return bindEvent(this.emitter, 'error', handler);
  }
}
