/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import NanoEvents from 'nanoevents';

import { type TransportReadable } from './transport';
import { RpcError } from './RpcError';
import { Response } from '@dlghq/grpc-web-gateway-signaling';

class ServerStream {
  id: string;
  emitter: NanoEvents<{ message: Uint8Array, error: RpcError }>;
  transport: TransportReadable;

  constructor(id: string, transport: TransportReadable) {
    this.id = id;
    this.transport = transport;
    this.emitter = new NanoEvents();
    this.transport
      .onMessage(message => {
        const res = Response.decode(message);

        if (res.id === this.id && res.push) {
          this.emitter.emit('message', res.push.payload);
        }
      })
      .onError(error => {
        this.emitter.emit('error', error);
      });
  }

  onMessage(handler: Uint8Array => void) {
    this.emitter.on('message', handler);
  }

  onError(handler: RpcError => void) {
    this.emitter.on('error', handler);
  }
}

export { ServerStream };
