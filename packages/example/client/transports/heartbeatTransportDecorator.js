// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

import { Request } from '@dlghq/grpc-web-gateway-signaling';
import { createNanoEvents } from 'nanoevents';

import { RpcError } from '@dlghq/grpc-web-gateway-client';
import { type StatusfulTransport } from '@dlghq/grpc-web-gateway-client';

const PING = Request.encode({ id: 'service', service: { ping: {} } }).finish();
const DEFAULT_HEARTBEAT_INTERVAL = 30000;

export const heartbeatTransportDecorator = (
  heartbeatInterval: number = DEFAULT_HEARTBEAT_INTERVAL,
) => (origin: StatusfulTransport): StatusfulTransport => {
  const emitter = createNanoEvents();
  let isAlive = false;

  const setupHeartbeat = (interval: number) => {
    const ping = () => {
      origin.send(PING);
    };

    origin.onOpen(() => {
      isAlive = true;
    });

    origin.onMessage(() => {
      isAlive = true;
    });

    const iid = setInterval(() => {
      if (!isAlive) {
        emitter.emit(
          'error',
          new RpcError('SERVER_CLOSED_CONNECTION', "Server doesn't respond"),
        );

        origin.close();

        return;
      }

      isAlive = false;
      ping();
    }, interval);

    return () => clearInterval(iid);
  };

  const cancelPing = setupHeartbeat(heartbeatInterval);
  origin.onClose(cancelPing);

  return origin;
};
