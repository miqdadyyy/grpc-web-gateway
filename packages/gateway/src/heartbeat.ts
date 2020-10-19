// Copyright 2018 dialog LLC <info@dlg.im>

import { nanoid } from 'nanoid';
import { Server } from 'ws';
import { logger } from './logger';
import { WebSocket } from './types';

export type HeartbeatController = {
  addConnection(connectionId: string, connection: WebSocket): void;
  stop(): void;
};

export function setupPingConnections(
  wss: Server,
  heartbeatInterval: number,
): HeartbeatController {
  const connectionsMap: WeakMap<
    WebSocket,
    { isAlive: boolean; id: string }
  > = new WeakMap();

  function heartbeat(this: WebSocket) {
    const wsMeta = connectionsMap.get(this);
    logger.info('Heartbeat', wsMeta ? wsMeta.id : 'undefined');
    connectionsMap.set(this, {
      isAlive: true,
      id: wsMeta ? wsMeta.id : nanoid(),
    });
  }

  const iid = setInterval(() => {
    logger.info('Clearing dead connections...');

    wss.clients.forEach((ws) => {
      const wsMeta = connectionsMap.get(ws);
      if (!wsMeta || !wsMeta.isAlive) {
        logger.info(
          'Terminate dead connection',
          wsMeta ? wsMeta.id : 'undefined id',
        );

        return ws.terminate();
      }

      connectionsMap.set(ws, { isAlive: false, id: wsMeta.id });
      ws.ping();
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
