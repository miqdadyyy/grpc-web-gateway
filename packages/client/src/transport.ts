// Copyright 2018 dialog LLC <info@dlg.im>

type Unbind = () => void;

export class TransportError extends Error {
  reason: Error | undefined;

  constructor(message: string, reason?: Error) {
    super(message);
    this.reason = reason;
  }
}

export interface TransportReadable {
  onMessage(handler: (message: Uint8Array) => void): Unbind;
  onError(handler: (error: TransportError) => void): Unbind;
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
