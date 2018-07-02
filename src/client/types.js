/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

export interface Transport {
  send(message: Uint8Array): void;
  onMessage(callback: (message: Uint8Array) => void): void;
}
