// @flow strict

// Copyright 2018 dialog LLC <info@dlg.im>

import Nanoevents from 'nanoevents';
import unbindAll from 'nanoevents/unbind-all';
import { Request, Response } from '@dlghq/grpc-web-gateway-signaling';

import { RpcError } from './RpcError';
import type { RpcCall, UnaryRequest, RpcCallStatus } from './types';
import { type Transport } from './transport';

export class UnaryCall implements RpcCall {
  id: string;
  transport: Transport;
  emitter: Nanoevents<{ message: Uint8Array, error: RpcError, end: void }>;
  status: RpcCallStatus;

  constructor(id: string, transport: Transport) {
    this.transport = transport;
    this.id = id;
    this.emitter = new Nanoevents();
    this.status = 'initial';

    let bindings = [
      this.onEnd(() => {
        this.status = 'closed';
        bindings.forEach(unbind => unbind());
        bindings = [];
      }),
      this.onError(() => {
        setImmediate(() => {
          if (this.status !== 'closed') {
            this.emitter.emit('end');
          }
        });
      }),
      this.transport.onError(error => {
        this.emitter.emit('error', error);
      }),
    ];
  }

  start({ service, method, payload, metadata }: UnaryRequest) {
    if (this.status === 'initial') {
      const { id } = this;

      this.transport.send({
        id,
        unary: { service, method, payload, metadata },
      });

      const unbindTransport = this.transport.onMessage(res => {
        if (res.id === this.id) {
          if (res.unary) {
            this.emitter.emit('message', res.unary.payload);
            this.emitter.emit('end');
          } else if (res.error) {
            const { error } = res;
            this.emitter.emit(
              'error',
              new RpcError(error.status.toString(), error.message),
            );
          }
        }
      });

      this.status = 'open';
      this.emitter.on('end', unbindTransport);
    }

    return this;
  }

  cancel(reason?: string) {
    if (this.status === 'open') {
      this.transport.send({
        id: this.id,
        cancel: { reason },
      });
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
