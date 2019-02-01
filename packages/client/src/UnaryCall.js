// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

import Nanoevents from 'nanoevents';
import unbindAll from 'nanoevents/unbind-all';
import { Request, Response } from '@dlghq/grpc-web-gateway-signaling';

import { RpcError } from './RpcError';
import type { RpcCall, UnaryRequest, RpcCallStatus } from './types';
import { type Transport } from './transport';

class UnaryCall implements RpcCall {
  id: string;
  transport: Transport;
  emitter: Nanoevents<{ message: Uint8Array, error: RpcError, end: void }>;
  status: RpcCallStatus;

  constructor(id: string, transport: Transport) {
    this.transport = transport;
    this.id = id;
    this.emitter = new Nanoevents();
    this.status = 'initial';

    this.emitter.on('end', () => {
      this.status = 'closed';
      unbindAll(this.emitter);
    });
  }

  start({ service, method, payload, metadata }: UnaryRequest) {
    if (this.status === 'initial') {
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
            this.emitter.emit('end');
          } else if (res.error) {
            const error = res.error;
            this.emitter.emit(
              'error',
              new RpcError(error.status.toString(), error.message),
            );
            this.emitter.emit('end');
            if (error.status === 1) {
              this.status = 'cancelled';
              this.emitter.emit('end');
            }
          }
        }
      });

      this.emitter.on('end', unbindTransport);
      this.status = 'open';
    }

    return this;
  }

  cancel(reason?: string) {
    if (this.status === 'open') {
      const message = Request.encode({
        id: this.id,
        cancel: { reason },
      }).finish();
      this.transport.send(message);
      this.emitter.emit('end');
    }
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

  toPromise(): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      this.emitter.on('message', resolve);
      this.emitter.on('error', reject);
    });
  }
}

export default UnaryCall;
