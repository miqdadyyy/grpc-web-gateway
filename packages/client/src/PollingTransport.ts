// Copyright 2018 dialog LLC <info@dlg.im>

import { Logger } from './Logger';
import { IntervalOrProviderFn, TransportReadyState } from './transport';
import eioClient, { Socket, UpgradeError } from 'engine.io-client';
import { DEFAULT_SUSPENDED_HEARTBEAT_INTERVAL } from './transportUtils';
import { BaseTransport } from './BaseTransport';

const DEFAULT_HEARTBEAT_INTERVAL = 30000;
const DEFAULT_POLLING_PATH = 'polling';

type EngineIoSocketEventMap = {
  open: () => void;
  flush: () => void;
  drain: () => void;
  ping: () => void;
  pong: () => void;
  message: (data: string | ArrayBuffer) => void;
  close: (mes: string, detail?: Error) => void;
  error: (error: Error) => void;
  upgradeError: (error: UpgradeError) => void;
  upgrade: () => void;
};

export type PollingTransportConfig = {
  heartbeatInterval?: number;
  suspendedHeartbeatInterval?: IntervalOrProviderFn;
  logger?: Logger;
  debug?: boolean;
  path?: string;
};

export class PollingTransport extends BaseTransport {
  private readyState: TransportReadyState = 'connecting';
  private socket: Socket | undefined;
  private socketSubscriptions: Array<() => void> = [];

  constructor(endpoint: string, config: PollingTransportConfig = {}) {
    super({
      loggerTag: 'Polling Transport',
      logger: config.logger ?? console,
      debug: config.debug ?? false,
      heartbeatInterval: config.heartbeatInterval ?? DEFAULT_HEARTBEAT_INTERVAL,
      suspendedHeartbeatInterval:
        config.suspendedHeartbeatInterval ??
        DEFAULT_SUSPENDED_HEARTBEAT_INTERVAL,
    });

    const { origin: transportUrl, pathname } = new URL(endpoint);
    const transportPath =
      config.path ??
      `${pathname}${pathname.endsWith('/') ? '' : '/'}${DEFAULT_POLLING_PATH}`;

    this.socket = eioClient(transportUrl, {
      path: transportPath,
      transports: ['polling'],
    });
    this.socket.binaryType = 'arraybuffer';

    this.bindSocketEvent('open', () => {
      this.readyState = 'open';
      this.handleSocketOpen();
    });

    this.bindSocketEvent('close', () => this.handleSocketClose());

    this.bindSocketEvent('error', (error) => {
      this.logger.log('Socket error', error);
      this.handleSocketError();
    });

    this.bindSocketEvent('message', (data) => {
      this.handleSocketMessage(data);
    });
  }

  getReadyState(): TransportReadyState {
    if (!this.socket) {
      return 'closed';
    }

    if (this.getIsSuspended() && this.readyState === 'open') {
      return 'suspended';
    }

    return this.readyState;
  }

  protected sendToSocket(message: Uint8Array): void {
    this.socket?.send(message);
  }

  protected closeSocket(code?: number): void {
    this.readyState = 'closed';

    if (this.socket) {
      this.logger.log(`Closing socket ${code ? `(${code})` : ''}...`);

      this.socketSubscriptions.forEach((teardown) => teardown());
      this.socket.close();

      this.socket = undefined;
      this.socketSubscriptions = [];

      this.logger.log('Closed socket');
    }
  }

  private bindSocketEvent<K extends keyof EngineIoSocketEventMap>(
    type: K,
    listener: EngineIoSocketEventMap[K],
  ) {
    if (this.socket) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.socket.on(type as any, listener);
      this.socketSubscriptions.push(() => {
        // @ts-ignore: Poor typings for engine.io-client
        this.socket?.off(type, listener);
      });
    }
  }
}
