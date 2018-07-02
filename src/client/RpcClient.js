/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Transport } from './types';
import uuid from 'uuid/v4';
import { Request, Response } from '../shared/signaling';

class RpcClient {
  transport: Transport;
  requests: Map<string, RpcRequest>;

  constructor(transport: Transport) {
    this.transport = transport;
    this.requests = new Map();
  }

  makeUnaryRequest(method: string, payload: Uint8Array, metadata: { [key: string]: string }) {
    const id = uuid();
    const message = Request.encode({ id, unary: { method, payload, metadata } }).finish();
    this.transport.send(message);
  }

  makeServerStreamRequest() {

  }

  makeClientStreamRequest() {

  }

  makeBidiStreamRequest() {

  }
}

export default RpcClient;
