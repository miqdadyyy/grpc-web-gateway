import { logger } from './logger';
import { IncomingMessage } from 'http';
import { nanoid } from 'nanoid';
import { Client } from '@grpc/grpc-js';
import { Server as WebSocketServer } from 'ws';
import { SocketCalls } from './socketCalls';
import { setupPingConnections } from './heartbeat';
import { MetadataParser } from './metadataParser';
import { WebSocket } from './types';
import { createGrpcSocketProxy, SocketSendMessage } from './grpcSocketProxy';

export function createWebSocketServer(params: {
  heartbeatInterval: number;
  grpcClientFactory: () => Client;
  httpMetadataParser: MetadataParser;
}): WebSocketServer {
  const { heartbeatInterval, grpcClientFactory, httpMetadataParser } = params;

  const socketCalls = new SocketCalls<WebSocket>();

  const wsServer = new WebSocketServer({ noServer: true });
  const heartbeat = setupPingConnections(wsServer, heartbeatInterval);

  wsServer.on('error', (error: Error) => {
    logger.error('WebSocket connection error:', error);
  });

  let globalConnectionId = 0;

  wsServer.on('connection', (ws, httpRequest: IncomingMessage) => {
    const connectionId = `${nanoid()}-${String(++globalConnectionId)}`;
    heartbeat.addConnection(connectionId, ws);

    const initialMetadata = httpMetadataParser(httpRequest);
    const grpcClient = grpcClientFactory();
    const connectionLogger = logger.child({ connectionId });

    connectionLogger.info(`WebSocket socket is opened`);

    const socketSend: SocketSendMessage = (data: Uint8Array) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(data);
      }
    };

    const handleSocketMessage = createGrpcSocketProxy<WebSocket>({
      logger: connectionLogger,
      grpcClient,
      initialMetadata,
      socketCalls,
      socket: ws,
      socketSend,
    });

    ws.on('message', (message) => {
      if (ws.readyState === ws.OPEN) {
        handleSocketMessage(message);
      }
    });

    ws.on('close', (code) => {
      connectionLogger.info('WebSocket is closed' + (code ? ` (${code})` : ''));
      socketCalls.cancelSocketCalls(ws);
      grpcClient.close();
    });
  });

  return wsServer;
}
