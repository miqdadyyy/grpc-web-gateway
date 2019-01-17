/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { type UnaryRequest } from './types';
import { type Response } from '../shared/signaling';

interface RpcUnaryRequest {
  start(UnaryRequest): void;
}

interface RpcUnaryResponse {
  onMessage((response: Response) => void): void;
}

interface RpcClientStream {
  push(UnaryRequest): void;
}

interface RpcServerStream {
  onMessage((response: Response) => void): void;
}

export interface RpcUnaryCall extends RpcUnaryRequest, RpcUnaryResponse {}
export interface RpcServerStreamCall extends RpcUnaryRequest, RpcServerStream {}
export interface RpcClientStreamCall
  extends RpcClientStream,
    RpcUnaryResponse {}
export interface RpcBidiStream extends RpcServerStream, RpcClientStream {}
