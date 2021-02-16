// Copyright 2018 dialog LLC <info@dlg.im>

import { Request, Response } from '@dlghq/grpc-web-gateway-signaling';
import { RpcCall, UnaryRequest, Unbind } from './types';
import { Transport } from './transport';
import { RpcError } from './RpcError';
import EventEmitter from 'eventemitter3';
import { bindEvent } from './utils/emitterUtils';

export class ServerStreamCall implements RpcCall {
  id: string;
  transport: Transport;
  emitter: EventEmitter<{
    message: [Uint8Array];
    error: [RpcError];
    end: [];
    cancel: [];
  }>;
  status: 'initial' | 'open' | 'closed' | 'cancelled';

  constructor(id: string, transport: Transport) {
    this.id = id;
    this.transport = transport;
    this.emitter = new EventEmitter();
    this.status = 'initial';

    this.emitter.on('end', () => {
      this.status = 'closed';
      this.emitter.removeAllListeners();
    });

    this.emitter.on('cancel', () => {
      this.status = 'cancelled';
      this.emitter.removeAllListeners();
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

      this.emitter.on('end', unbindTransport);
      this.emitter.on('cancel', unbindTransport);

      this.status = 'open';
      this.transport.send(message);
    } else if (this.status === 'closed' || this.status === 'cancelled') {
      this.emitter.emit('cancel');
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
    }

    if (this.status === 'initial' || this.status === 'open') {
      this.emitter.emit('cancel');
    }
  }

  onMessage(handler: (response: Uint8Array) => void): Unbind {
    return bindEvent(this.emitter, 'message', handler);
  }

  onError(handler: (error: RpcError) => void): Unbind {
    return bindEvent(this.emitter, 'error', handler);
  }

  onEnd(handler: () => void): Unbind {
    return bindEvent(this.emitter, 'end', handler);
  }

  onCancel(handler: () => void): Unbind {
    return bindEvent(this.emitter, 'cancel', handler);
  }
}
