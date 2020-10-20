// Copyright 2018 dialog LLC <info@dlg.im>

import { Response } from '@dlghq/grpc-web-gateway-signaling';
import { UnaryRequest } from './types';

interface RpcUnaryRequest {
  start(request: UnaryRequest): void;
}

interface RpcUnaryResponse {
  onMessage(handler: (response: Response) => void): void;
}

interface RpcClientStream {
  push(request: UnaryRequest): void;
}

interface RpcServerStream {
  onMessage(handler: (response: Response) => void): void;
}

export interface RpcUnaryCall extends RpcUnaryRequest, RpcUnaryResponse {}
export interface RpcServerStreamCall extends RpcUnaryRequest, RpcServerStream {}
export interface RpcClientStreamCall
  extends RpcClientStream,
    RpcUnaryResponse {}
export interface RpcBidiStream extends RpcServerStream, RpcClientStream {}
