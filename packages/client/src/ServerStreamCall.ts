// Copyright 2018 dialog LLC <info@dlg.im>

import { createNanoEvents, Emitter, Unsubscribe } from 'nanoevents';
import { Request, Response } from '@dlghq/grpc-web-gateway-signaling';
import { RpcCall, UnaryRequest } from './types';
import { Transport } from './transport';
import { RpcError } from './RpcError';
import { unbindAll } from './utils/emitterUtils';

export class ServerStreamCall implements RpcCall {
  id: string;
  transport: Transport;
  emitter: Emitter<{
    message: (message: Uint8Array) => void;
    error: (error: RpcError) => void;
    end: () => void;
    cancel: () => void;
  }>;
  status: 'initial' | 'open' | 'closed' | 'cancelled';

  constructor(id: string, transport: Transport) {
    this.id = id;
    this.transport = transport;
    this.emitter = createNanoEvents();
    this.status = 'initial';

    this.emitter.on('end', () => {
      this.status = 'closed';
      unbindAll(this.emitter);
    });

    this.emitter.on('cancel', () => {
      this.status = 'cancelled';
      unbindAll(this.emitter);
    });

    this.transport.onError((error) => this.emitter.emit('error', error));
  }

  start({
    service,
    method,
    payload,
    metadata,
  }: UnaryRequest): ServerStreamCall {
    if (this.status === 'initial') {
      const id = this.id;
      const message = Request.encode({
        id,
        unary: {
          service,
          method,
          payload,
          metadata,
          // STREAM
          responseType: 2,
        },
      }).finish();

      this.transport.send(message);

      const unbindTransport = this.transport.onMessage((message) => {
        const res = Response.decode(message);

        if (res.id === this.id) {
          if (res.push && res.push.payload) {
            this.emitter.emit('message', res.push.payload);
          } else if (res.end) {
            this.emitter.emit('end');
          } else if (res.error) {
            const error = res.error;
            if (error.status === 1) {
              this.emitter.emit('cancel');
            } else {
              if (error.status && error.message) {
                this.emitter.emit(
                  'error',
                  new RpcError(String(error.status), error.message),
                );
              }
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

  cancel(reason?: string): void {
    if (this.status === 'open') {
      const message = Request.encode({
        id: this.id,
        cancel: { reason },
      }).finish();
      this.transport.send(message);
      this.emitter.emit('cancel');
    }
  }

  onMessage(handler: (response: Uint8Array) => void): Unsubscribe {
    return this.emitter.on('message', handler);
  }

  onError(errorHandler: (error: RpcError) => void): Unsubscribe {
    return this.emitter.on('error', errorHandler);
  }

  onEnd(handler: () => void): Unsubscribe {
    return this.emitter.on('end', handler);
  }

  onCancel(handler: () => void): Unsubscribe {
    return this.emitter.on('cancel', handler);
  }
}
