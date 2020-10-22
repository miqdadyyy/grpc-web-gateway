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

  wsServer.on('connection', (ws, httpRequest: IncomingMessage) => {
    const connectionId = nanoid();
    heartbeat.addConnection(connectionId, ws);

    const initialMetadata = httpMetadataParser(httpRequest);
    const grpcClient = grpcClientFactory();
    const connectionLogger = logger.child({ connectionId });

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

    ws.on('message', handleSocketMessage);

    ws.on('close', () => {
      logger.info('WebSocket is closed', connectionId);
      socketCalls.cancelSocketCalls(ws);
      grpcClient.close();
    });
  });

  return wsServer;
}
