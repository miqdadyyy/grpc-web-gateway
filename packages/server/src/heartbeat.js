// @flow
// Copyright 2018 dialog LLC <info@dlg.im>

import { noop } from 'lodash/fp';
import nanoid from 'nanoid';

import type { Server, WebSocket } from 'ws';

import { logger } from './logger';

export function setupPingConnections(wss: Server, heartbeatInterval: number) {
  const connectionsMap: WeakMap<
    WebSocket,
    { isAlive: boolean, id: string },
  > = new WeakMap();

  function heartbeat() {
    const wsMeta = connectionsMap.get(this);
    logger.info('Heartbeat', wsMeta ? wsMeta.id : 'undefined');
    connectionsMap.set(this, {
      isAlive: true,
      id: wsMeta ? wsMeta.id : nanoid(),
    });
  }

  const iid = setInterval(() => {
    logger.info('Clearing dead connections...');

    wss.clients.forEach(ws => {
      const wsMeta = connectionsMap.get(ws);
      if (!wsMeta || wsMeta.isAlive === false) {
        logger.info(
          'Terminate dead connection',
          wsMeta ? wsMeta.id : 'undefined id',
        );

        return ws.terminate();
      }

      connectionsMap.set(ws, { isAlive: false, id: wsMeta.id });
      ws.ping(noop);
    });
  }, heartbeatInterval);

  return {
    addConnection: (connectionId: string, connection: WebSocket) => {
      connectionsMap.set(connection, { isAlive: true, id: connectionId });
      connection.on('pong', heartbeat);
    },
    stop: () => clearInterval(iid),
  };
}
