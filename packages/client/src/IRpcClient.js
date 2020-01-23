// @flow strict

// Copyright 2018 dialog LLC <info@dlg.im>

import type { UnaryRequest, StreamRequest } from './types';

export interface IRpcClient<UnaryCall, ClientStreamCall> {
  makeUnaryRequest(request: UnaryRequest): [UnaryCall, () => void];
  makeServerStreamRequest(request: UnaryRequest): [UnaryCall, () => void];
  makeClientStreamRequest(
    request: StreamRequest,
  ): [ClientStreamCall, () => void];
  makeBidiStreamRequest(request: StreamRequest): [ClientStreamCall, () => void];
}

export interface IRxRpcClient<UnaryCall, ClientStreamCall> {
  makeUnaryRequest(request: UnaryRequest): UnaryCall;
  makeServerStreamRequest(request: UnaryRequest): UnaryCall;
  makeClientStreamRequest(request: StreamRequest): ClientStreamCall;
  makeBidiStreamRequest(request: StreamRequest): ClientStreamCall;
}
