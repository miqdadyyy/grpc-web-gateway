/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { RpcError } from './RpcError';
import WebSocketTransport from './WebSocketTransport';
import { Transport } from './transport';

type WsTransportFactory = () => WebSocketTransport;

type RetryWsTransportConfig = {
  debug: boolean,
};

class RetryWsTransport implements Transport {
  origin: WebSocketTransport;
  factory: WsTransportFactory;
  nextPeriod: number;
  logger: {
    log(...any): void,
  };

  constructor(
    factory: WsTransportFactory,
    { debug }: RetryWsTransportConfig = { debug: false },
  ) {
    this.factory = factory;
    this.nextPeriod = 0;
    this.setupWsTransport();
    if (debug) {
      this.logger = console;
    } else {
      this.logger = {
        log: () => undefined,
      };
    }
  }

  setupWsTransport() {
    const nextInterval = Math.E ** (this.nextPeriod * 0.2) * 1000;
    this.logger.log({ nextInterval });
    this.origin = this.factory();
    this.origin.onEnd(() => {
      this.nextPeriod = Math.min(this.nextPeriod + 1, 20);

      this.logger.log('Increased period', this.nextPeriod);
      setTimeout(() => {
        this.logger.log('Try reconnect');
        this.setupWsTransport();
      }, nextInterval);
    });
    this.origin.onOpen(() => {
      this.logger.log('Opened');
      this.nextPeriod = 0;
    });
  }

  send(message: Uint8Array): void {
    this.origin.send(message);
  }

  onError(handler: RpcError => void) {
    return this.origin.onError(handler);
  }

  onMessage(handler: Uint8Array => void) {
    return this.origin.onMessage(handler);
  }
}

export default RetryWsTransport;
