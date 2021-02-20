// Copyright 2018 dialog LLC <info@dlg.im>

type Unbind = () => void;

export class TransportError extends Error {
  reason: Error | undefined;

  constructor(message: string, reason?: Error) {
    super(message);
    this.reason = reason;
  }
}

export type IntervalOrProviderFn = number | ((attempt: number) => number);

export type TransportReadyState =
  | 'connecting'
  | 'open'
  | 'suspended'
  | 'closing'
  | 'closed';

export interface Transport {
  onOpen(handler: () => void): Unbind;
  onReadyState(handler: (readyState: TransportReadyState) => void): Unbind;
  onMessage(handler: (message: Uint8Array) => void): Unbind;
  onError(handler: (error: TransportError) => void): Unbind;
  onClose(handler: () => void): Unbind;

  getReadyState(): TransportReadyState;
  send(message: Uint8Array): void;
  ping(): void;
  close(): void;
}
