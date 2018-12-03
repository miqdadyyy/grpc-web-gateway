/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { RpcTransport, RpcCall, UnaryRequest } from './types';
import uuid from 'uuid/v4';
import Kefir from 'kefir';
import { Request, Response } from '../shared/signaling';
import UnaryCall from './UnaryCall';

class RpcClient {
  transport: RpcTransport;
  calls: Map<string, RpcCall>;

  constructor(transport: RpcTransport) {
    this.transport = transport;
    this.calls = new Map();

    this.transport
      .start()
      .map(bytes => Response.decode(bytes))
      .observe({
        value: res => {
          const call = this.calls.get(res.id);
          if (call) {
            call.onMessage(res);
          } else {
            console.error('Unhandled incoming message: ', res);
          }
        },
        error(error) {
          console.log('error:', error);
        },
        end() {
          console.log('end');
        },
      });
  }

  makeUnaryRequest(request: UnaryRequest) {
    return Kefir.stream(emitter => {
      const id = uuid();

      const call = new UnaryCall(this.transport, emitter);
      this.calls.set(id, call);

      call.start(id, request);

      return () => {
        call.cancel(id);
        this.calls.delete(id);
      };
    });
  }

  makeServerStreamRequest(request: UnaryRequest) {
    return Kefir.stream(emitter => {
      const id = uuid();

      const call = new UnaryCall(this.transport, emitter);
      this.calls.set(id, call);

      call.start(id, request);

      return () => {
        call.cancel(id);
        this.calls.delete(id);
      };
    });
  }

  makeClientStreamRequest() {}

  makeBidiStreamRequest() {}
}

export default RpcClient;
