/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { type RpcError } from './RpcError';

export type ReadableTransport = {
  onMessage(listener: (Uint8Array) => mixed): void,
  onError(listener: (RpcError) => mixed): void,
};

export type WritableTransport = {
  send(Uint8Array): void,
};

export type Transport = ReadableTransport & WritableTransport;
