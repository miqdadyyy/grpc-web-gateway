// Copyright 2018 dialog LLC <info@dlg.im>

 import { Logger } from './Logger';
import { IntervalOrProviderFn, TransportReadyState } from './transport';
import { DEFAULT_SUSPENDED_HEARTBEAT_INTERVAL } from './transportUtils';
import { BaseTransport } from './BaseTransport';

export type WebSocketTransportConfig = {
  heartbeatInterval?: number;
  suspendedHeartbeatInterval?: IntervalOrProviderFn;
  logger?: Logger;
  debug?: boolean;
};

const DEFAULT_HEARTBEAT_INTERVAL = 30000;

export class WebSocketTransport extends BaseTransport {
  private socket: WebSocket | undefined;
  private socketSubscriptions: Array<() => void> = [];

  constructor(endpoint: string, config: WebSocketTransportConfig = {}) {
    super({
      loggerTag: 'WS Transport',
      logger: config.logger ?? console,
      debug: config.debug ?? false,
      heartbeatInterval: config.heartbeatInterval ?? DEFAULT_HEARTBEAT_INTERVAL,
      suspendedHeartbeatInterval:
        config.suspendedHeartbeatInterval ??
        DEFAULT_SUSPENDED_HEARTBEAT_INTERVAL,
    });

    this.socket = new WebSocket(endpoint);
    this.socket.binaryType = 'arraybuffer';

    this.bindSocketEvent('open', () => this.handleSocketOpen());

    this.bindSocketEvent('close', () => this.handleSocketClose());

    this.bindSocketEvent('error', (event: Event) => {
      this.logger.log('Socket error', event);
      this.handleSocketError();
    });

    this.bindSocketEvent('message', (event: MessageEvent) => {
      this.handleSocketMessage(event.data);
    });
  }

  getReadyState(): TransportReadyState {
    if (!this.socket) {
      return 'closed';
    }

    switch (this.socket.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return this.getIsSuspended() ? 'suspended' : 'open';
      case WebSocket.CLOSING:
        return 'closing';
      case WebSocket.CLOSED:
      default:
        return 'closed';
    }
  }

  protected sendToSocket(message: Uint8Array): void {
    this.socket?.send(message);
  }

  protected closeSocket(code?: number): void {
    if (this.socket) {
      this.logger.log(`Closing socket ${code ? `(${code})` : ''}...`);

      this.socketSubscriptions.forEach((teardown) => teardown());

      const { readyState } = this.socket;
      if (readyState !== WebSocket.CLOSING && readyState !== WebSocket.CLOSED) {
        this.socket.close(code);
      }

      this.socket = undefined;
      this.socketSubscriptions = [];

      this.logger.log('Closed socket');
    }
  }

  private bindSocketEvent<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => void,
  ) {
    if (this.socket) {
      this.socket.addEventListener(type, listener);
      this.socketSubscriptions.push(() =>
        this.socket?.removeEventListener(type, listener),
      );
    }
  }
}
