// Copyright 2018 dialog LLC <info@dlg.im>

import { Request, Response } from '@dlghq/grpc-web-gateway-signaling';
import { createClientTransportRpcError, RpcError } from './RpcError';
import type { RpcCall, RpcCallStatus, UnaryRequest, Unbind } from './types';
import { Transport } from './transport';
import EventEmitter from 'eventemitter3';
import { bindEvent } from './utils/emitterUtils';

export class UnaryCall implements RpcCall {
  id: string;
  transport: Transport;
  emitter: EventEmitter<{
    message: [Uint8Array];
    error: [RpcError];
    end: [];
    cancel: [];
  }>;
  status: RpcCallStatus;

  constructor(id: string, transport: Transport) {
    this.transport = transport;
    this.id = id;
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

    this.transport.onError((error) =>
      this.emitter.emit('error', createClientTransportRpcError(error)),
    );
  }

  start({ service, method, payload, metadata }: UnaryRequest): UnaryCall {
    if (this.status === 'initial') {
      const id = this.id;
      const message = Request.encode({
        id,
        unary: { service, method, payload, metadata },
      }).finish();

      const unbindTransport = this.transport.onMessage((message) => {
        const res = Response.decode(message);

        if (res.id === this.id) {
          if (res.unary && res.unary.payload) {
            this.emitter.emit('message', res.unary.payload);
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
