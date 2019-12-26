// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

import type {
  Response,
  RequestPayload,
} from '@dlghq/grpc-web-gateway-signaling';
import type { RpcError } from './RpcError';

type Unbind = () => void;

export interface TransportReadable {
  onMessage(messageHandler: (response: Response) => void): Unbind;
  onError(errorHandler: (error: RpcError) => void): Unbind;
}

export interface TransportWritable {
  send(request: RequestPayload): void;
}

export interface Transport extends TransportReadable, TransportWritable {}

export interface StatusfulTransport extends Transport {
  close(): void;
  onOpen(() => void): Unbind;
  onClose(() => void): Unbind;
}
