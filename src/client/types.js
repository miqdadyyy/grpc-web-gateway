/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Observable } from 'kefir';
import { RpcError } from './RpcError';

import { type Response } from '../shared/signaling';

export interface WriteRpcTransport {
  send(message: Uint8Array): void;
}

export interface RpcTransport extends WriteRpcTransport {
  start(): Observable<Uint8Array, RpcError>;
}

export interface RpcCall {
  cancel(): void;
  onMessage(handler: (Uint8Array) => void): () => void;
  onError(handler: (RpcError) => void): () => void;
  onEnd(handler: () => void): () => void;
}

export type Metadata = { [key: string]: string };

export type UnaryRequest = {
  service: string,
  method: string,
  payload: Uint8Array,
  metadata: Metadata,
};

export type PushRequest = {
  payload: Uint8Array,
  metadata: Metadata,
};

export type StreamRequest = {
  service: string,
  method: string,
  metadata: Metadata,
};

// export class RpcError extends Error {
//   code: string;

//   constructor(code: string, message: string) {
//     super(message);
//     this.code = code;
//   }
// }
