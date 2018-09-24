/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { type Observable } from 'kefir';
import { type RpcTransport, RpcError } from './types';

type RpcTransportFactory = () => RpcTransport;

class RetryTransport implements RpcTransport {
  child: RpcTransport;
  factory: RpcTransportFactory;

  constructor(factory: () => RpcTransport) {
    this.factory = factory;
    this.child = factory();
  }

  send(message: Uint8Array): void {
    this.child.send(message);
  }

  start(): Observable<Uint8Array, RpcError> {
    return this.child.start();
  }
}

export default RetryTransport;
