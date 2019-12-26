// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

import Nanoevents from 'nanoevents';
import unbindAll from 'nanoevents/unbind-all';
import { Request, Response } from '@dlghq/grpc-web-gateway-signaling';

import type {
  RpcCall,
  PushRequest,
  StreamRequest,
  RpcCallStatus,
} from './types';
import { Transport } from './transport';
import { RpcError } from './RpcError';

export class ClientStreamCall implements RpcCall {
  id: string;
  transport: Transport;
  emitter: Nanoevents<{
    message: Uint8Array,
    error: RpcError,
    end: void,
  }>;
  status: RpcCallStatus;

  constructor(id: string, transport: Transport) {
    this.id = id;
    this.transport = transport;
    this.emitter = new Nanoevents();
    this.status = 'initial';

    let bindings = [
      this.onEnd(() => {
        this.status = 'closed';
        bindings.forEach(unbind => unbind());
        bindings = [];
      }),
      this.onError(() => {
        this.emitter.emit('end');
      }),
      this.transport.onError(error => {
        this.emitter.emit('error', error);
      }),
    ];
  }

  start({ service, method, metadata }: StreamRequest) {
    if (this.status === 'initial') {
      const { id } = this;
      this.transport.send({
        id,
        stream: { service, method, metadata },
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

  send({ payload, metadata }: PushRequest) {
    if (this.status === 'open') {
      this.transport.send({
        id: this.id,
        push: { payload, metadata },
      });
    }
  }

  end() {
    if (this.status === 'open') {
      this.transport.send({ id: this.id, end: {} });
      this.emitter.emit('end');
    }
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
}

export default ClientStreamCall;
