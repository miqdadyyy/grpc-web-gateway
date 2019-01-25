/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import NanoEvents from 'nanoevents';
import { TransportWritable } from './transport';

class ClientStream {
  id: string;
  emitter: NanoEvents<{ message: Uint8Array, end: void }>;
  transport: TransportWritable;

  constructor(id: string, transport: TransportWritable) {
    this.id = id;
    this.transport = transport;
    this.emitter = new NanoEvents();
    this.emitter.on('message', message => {
      this.transport.send(message);
    });
  }

  send(message: Uint8Array) {
    this.emitter.emit('message', message);
  }

  end() {
    this.emitter.emit('end');
  }

  onEnd(handler: void => void) {
    this.emitter.on('end', handler);
  }
}

export { ClientStream };
