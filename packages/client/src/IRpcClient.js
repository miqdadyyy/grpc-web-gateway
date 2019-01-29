/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { UnaryRequest, StreamRequest } from './types';

export interface IRpcClient<UnaryCall, ClientStreamCall> {
  makeUnaryRequest(request: UnaryRequest): UnaryCall;
  makeServerStreamRequest(request: UnaryRequest): UnaryCall;
  makeClientStreamRequest(request: StreamRequest): ClientStreamCall;
  makeBidiStreamRequest(request: StreamRequest): ClientStreamCall;
}
