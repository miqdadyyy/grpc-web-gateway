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
    cancel: void,
    ...
  }>;
  status: RpcCallStatus;

  constructor(id: string, transport: Transport) {
    this.id = id;
    this.transport = transport;
    this.emitter = new Nanoevents();
    this.status = 'initial';

    this.emitter.on('end', () => {
      unbindAll(this.emitter);
      this.status = 'closed';
    });

    this.emitter.on('cancel', () => {
      unbindAll(this.emitter);
      this.status = 'cancelled';
    });

    this.transport.onError(error => this.emitter.emit('error', error));
  }

  start({ service, method, metadata }: StreamRequest) {
    if (this.status === 'initial') {
      const id = this.id;
      const message = Request.encode({
        id,
        stream: { service, method, metadata },
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

            if (error.status === 1) {
              this.emitter.emit('cancel');
            } else {
              this.emitter.emit(
                'error',
                new RpcError(error.status.toString(), error.message),
              );
              this.emitter.emit('end');
            }
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
      const id = this.id;
      const message = Request.encode({
        id,
        push: { payload, metadata },
      }).finish();

      this.transport.send(message);
    }
  }

  end() {
    if (this.status === 'open') {
      const message = Request.encode({ id: this.id, end: {} }).finish();
      this.transport.send(message);
    }
  }

  cancel(reason?: string) {
    if (this.status === 'open') {
      const message = Request.encode({
        id: this.id,
        cancel: { reason },
      }).finish();
      this.transport.send(message);
      this.emitter.emit('cancel');
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

  onCancel(handler: () => void) {
    return this.emitter.on('cancel', handler);
  }
}

export default ClientStreamCall;
