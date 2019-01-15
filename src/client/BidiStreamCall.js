/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import Nanoevents from 'nanoevents';
import unbindAll from 'nanoevents/unbind-all';

import { type RpcCall, type PushRequest, type StreamRequest } from './types';
import { Transport } from './transport';
import { Request, Response } from '../shared/signaling';
import { RpcError } from './RpcError';

export class BidiStreamCall implements RpcCall {
  id: string;
  transport: Transport;
  emitter: Nanoevents<{ message: Uint8Array, error: RpcError, end: void }>;

  constructor(id: string, transport: Transport) {
    this.id = id;
    this.transport = transport;
    this.emitter = new Nanoevents();

    this.emitter.on('end', () => unbindAll(this.emitter));
  }

  start({ service, method, metadata }: StreamRequest) {
    const id = this.id;
    const message = Request.encode({
      id,
      stream: { service, method, metadata },
    }).finish();

    this.transport.send(message);

    const unbindTransport = this.transport.onMessage(message => {
      const res = Response.decode(message);

      if (res.id === this.id) {
        if (res.push) {
          this.emitter.emit('message', res.push.payload);
        } else if (res.end) {
          this.emitter.emit('end');
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

    return this;
  }

  send({ payload, metadata }: PushRequest) {
    const id = this.id;
    const message = Request.encode({
      id,
      push: { payload, metadata },
    }).finish();

    this.transport.send(message);
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
}

export default BidiStreamCall;
