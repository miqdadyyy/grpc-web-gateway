/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { type WritableTransport } from './transport2';

export type Metadata = { [key: string]: string };

export type UnaryRequest = {
  service: string,
  method: string,
  payload: Uint8Array,
  metadata: Metadata,
};

export type ClientStream = {
  send(Uint8Array): void,
  end(): void,
  onEnd(listener: (void) => mixed): void,
};

export type ClientStreamFactory = (
  id: string,
  transport: WritableTransport,
) => ClientStream;

type RpcUnaryCall = {
  start(UnaryRequest): void,
};

type RpcClientStreamCall = {
  start(ClientStream): void,
};

export type RpcCall = RpcUnaryCall | RpcClientStreamCall;
