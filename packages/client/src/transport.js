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

type Unbind = () => void;

export interface TransportReadable {
  onMessage(messageHandler: (message: Uint8Array) => void): Unbind;
  onError(errorHandler: (error: RpcError) => void): Unbind;
}

export interface TransportWritable {
  send(message: Uint8Array): void;
}

export interface Transport extends TransportReadable, TransportWritable {}
