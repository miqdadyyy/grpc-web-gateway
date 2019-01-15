/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import Nanoevents from 'nanoevents';
import unbindAll from 'nanoevents/unbind-all';

import { RpcError } from './RpcError';
import { type RpcCall, type UnaryRequest } from './types';
import { type Transport } from './transport';
import { Request, Response } from '../shared/signaling';

class UnaryCall implements RpcCall {
  id: string;
  transport: Transport;
  emitter: Nanoevents<{ message: Uint8Array, error: RpcError, end: void }>;

  constructor(id: string, transport: Transport) {
    this.transport = transport;
    this.id = id;
    this.emitter = new Nanoevents();

    this.emitter.on('end', () => unbindAll(this.emitter));
  }

  start({ service, method, payload, metadata }: UnaryRequest) {
    const id = this.id;
    const message = Request.encode({
      id,
      unary: { service, method, payload, metadata },
    }).finish();
    this.transport.send(message);

    const unbindTransport = this.transport.onMessage(message => {
      const res = Response.decode(message);

      if (res.id === this.id) {
        if (res.unary) {
          this.emitter.emit('message', res.unary.payload);
        } else if (res.error) {
          const error = res.error;
          this.emitter.emit(
            'error',
            new RpcError(error.status.toString(), error.message),
          );
        }
      }
    });

    this.emitter.on('end', unbindTransport);
    this.emitter.on('message', () => this.emitter.emit('end'));
    this.emitter.on('error', () => this.emitter.emit('end'));

    return this;
  }

  cancel() {
    const message = Request.encode({ id: this.id, cancel: {} }).finish();
    this.transport.send(message);
    this.emitter.emit('end');
  }

  onMessage(handler: (response: Uint8Array) => void) {
    return this.emitter.on('message', handler);
  }

  onError(errorHandler: (error: RpcError) => void) {
    return this.emitter.on('error', errorHandler);
  }

  onEnd(handler: () => void) {
    return this.emitter.on('end', handler);
  }

  toPromise() {
    return new Promise<Uint8Array, RpcError>((resolve, reject) => {
      this.emitter.on('message', resolve);
      this.emitter.on('error', reject);
    });
  }
}

export default UnaryCall;
