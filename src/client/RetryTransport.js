/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { type Observable } from 'kefir';

import { RpcDuplexTransport } from './transport';
import { RpcError } from './RpcError';

type RpcTransportFactory = () => RpcDuplexTransport;

class RetryTransport implements RpcDuplexTransport {
  origin: RpcDuplexTransport;
  factory: RpcTransportFactory;

  constructor(factory: RpcTransportFactory) {
    this.factory = factory;
    this.origin = factory();
  }

  send(message: Uint8Array): void {
    const retrySend = (message, tryCount) => {
      switch (tryCount) {
        case 0:
        case 1: {
          try {
            this.origin.send(message);
          } catch (e) {
            console.error(e);
            console.log(`Retrying...`);
            retrySend(message, tryCount + 1);
          }
        }

        default:
          try {
            this.origin.send(message);
          } catch (e) {
            console.error(e);
            console.log(
              `Retrying in ${Math.E ** (tryCount - 2) * 1000} seconds...`,
            );
            setTimeout(
              () => retrySend(message, tryCount + 1),
              Math.E ** (tryCount - 2) * 1000,
            );
          }
      }
    };

    retrySend(message, 0);
  }

  read(): Observable<Uint8Array, RpcError> {
    return this.origin.read();
  }
}

export default RetryTransport;
