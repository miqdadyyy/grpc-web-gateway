/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import Nanoevents from 'nanoevents';

import { type Transport } from './transport';
import { RpcError } from './RpcError';

type MessageHandler = (message: Uint8Array) => void;
type ErrorHandler = (error: RpcError) => void;
type TransportFactory = void => Transport;

class StableWsTransport implements Transport {
  queue: Array<Uint8Array>;
  transport: Transport;
  transportFactory: void => Transport;
  emitter: Nanoevents<{ start: void, stop: void }>;
  isAlive: boolean;
  createSubscriptions: (() => () => void) | null;
  shutdown: () => void;

  constructor(transportFactory: TransportFactory) {
    this.queue = [];

    this.transportFactory = transportFactory;
    this.emitter = new Nanoevents();
    this.setupTransport();

    this.createSubscriptions = null;
  }

  setupTransport() {
    console.log('Setup transport');
    this.emitter.emit('start');

    if (this.createSubscriptions) {
      console.log('Creating subscriptions...');
      this.shutdown = this.createSubscriptions();
    }
    this.transport = this.transportFactory();
    this.isAlive = true;
    if (this.queue.length !== 0) {
      this.queue.forEach(message => this.send(message));
      this.queue = [];
    }
    this.transport.onError(error => {
      console.log({ error });
      this.emitter.emit('stop');
      if (this.shutdown) {
        console.log('Shutdown subscriptions...');
        this.shutdown();
      }
      if (error.code === 'SERVER_CLOSED_CONNECTION') {
        this.setupTransport();
      }
    });
  }

  handleClose() {
    this.isAlive = false;
  }

  onStart(handler: () => () => void) {
    this.createSubscriptions = handler;
    console.log('Creating subscriptions...');
    this.shutdown = this.createSubscriptions();
  }

  onStop(handler: () => void) {
    this.emitter.on('stop', handler);
  }

  onMessage(handler: MessageHandler) {
    return this.transport.onMessage(handler);
  }

  onError(handler: ErrorHandler) {
    return this.transport.onError(handler);
  }

  send(message: Uint8Array): void {
    if (this.isAlive) {
      this.transport.send(message);
    } else {
      this.queue.push(message);
    }
  }
}

export default StableWsTransport;
