// Copyright 2018 dialog LLC <info@dlg.im>

import { RpcError } from './RpcError';
import { WebSocketTransport } from './WebSocketTransport';
import { Transport } from './transport';
import { Unsubscribe } from 'nanoevents';

type WsTransportFactory = () => WebSocketTransport;

export type RetryWsTransportConfig = { debug: boolean };

const LOG_PREFIX = 'RetryTransport';

export class RetryWsTransport implements Transport {
  private origin!: WebSocketTransport;
  private factory: WsTransportFactory;
  private nextPeriod: number;
  private logger: { log(...args: Array<unknown>): void };

  constructor(
    factory: WsTransportFactory,
    { debug }: RetryWsTransportConfig = { debug: false },
  ) {
    this.factory = factory;
    this.nextPeriod = 0;

    if (debug) {
      this.logger = {
        log: (...args) => console.log(`[${LOG_PREFIX}]`, ...args),
      };
    } else {
      this.logger = {
        log: () => undefined,
      };
    }

    this.setupWsTransport();
  }

  setupWsTransport(): void {
    const nextInterval = Math.E ** (this.nextPeriod * 0.2) * 1000;
    this.logger.log({ nextInterval });
    this.origin = this.factory();
    this.origin.onClose(() => {
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

  onError(handler: (error: RpcError) => void): Unsubscribe {
    return this.origin.onError(handler);
  }

  onMessage(handler: (message: Uint8Array) => void): Unsubscribe {
    return this.origin.onMessage(handler);
  }
}
