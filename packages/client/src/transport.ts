// Copyright 2018 dialog LLC <info@dlg.im>

import { RpcError } from './RpcError';

type Unbind = () => void;

export interface TransportReadable {
  onMessage(messageHandler: (message: Uint8Array) => void): Unbind;
  onError(errorHandler: (error: RpcError) => void): Unbind;
}

export interface TransportWritable {
  send(message: Uint8Array): void;
}

export interface Transport extends TransportReadable, TransportWritable {}

export type TransportReadyState = 'connecting' | 'open' | 'closing' | 'closed';

export interface StatusfulTransport extends Transport {
  getReadyState(): TransportReadyState;
  close(): void;
  onOpen(handler: () => void): Unbind;
  onClose(handler: () => void): Unbind;
}
