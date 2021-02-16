// Copyright 2018 dialog LLC <info@dlg.im>

import EventEmitter from 'eventemitter3';
import { Request, Response } from '@dlghq/grpc-web-gateway-signaling';
import {
  PushRequest,
  RpcCall,
  RpcCallStatus,
  StreamRequest,
  Unbind,
} from './types';
import { Transport } from './transport';
import { RpcError } from './RpcError';
import { bindEvent } from './utils/emitterUtils';

export class BidiStreamCall implements RpcCall {
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

  start({ service, method, metadata }: StreamRequest): BidiStreamCall {
    if (this.status === 'initial') {
      const id = this.id;
      const message = Request.encode({
        id,
        stream: {
          service,
          method,
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

  send({ payload, metadata }: PushRequest): void {
    if (this.status === 'open') {
      const id = this.id;
      const message = Request.encode({
        id,
        push: { payload, metadata },
      }).finish();

      this.transport.send(message);
    }
  }

  end(): void {
    if (this.status === 'open') {
      const message = Request.encode({ id: this.id, end: {} }).finish();
      this.transport.send(message);
      this.emitter.emit('end');
    }
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
