/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { type Observable } from 'kefir';

import { type RpcError } from './RpcError';

export interface RpcWritableTransport {
  send(message: Uint8Array): void;
}

export interface RpcReadableTransport {
  read(): Observable<Uint8Array, RpcError>;
}

export interface RpcDuplexTransport
  extends RpcWritableTransport,
    RpcReadableTransport {}

export interface TransportReadable {
  onMessage(messageHandler: (message: Uint8Array) => void): TransportReadable;
  onError(errorHandler: (error: RpcError) => void): TransportReadable;
}

export interface TransportWritable {
  send(message: Uint8Array): void;
}

export interface Transport extends TransportReadable, TransportWritable {}
