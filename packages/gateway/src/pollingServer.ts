import { Server, Socket } from 'engine.io';
import { SocketCalls } from './socketCalls';
import { nanoid } from 'nanoid';
import { Client } from '@dlghq/grpc-js';
import client from 'prom-client';
import { MetadataParser } from './metadataParser';
import { logger } from './logger';
import { createGrpcSocketProxy } from './grpcSocketProxy';

const pollingConnectionsCount = new client.Gauge({
  name: 'node_polling_connection_count',
  help: 'node_polling_connection_count_help',
});

export function createPollingServer(params: {
  grpcClientFactory: () => Client;
  httpMetadataParser: MetadataParser;
}): Server {
  const { grpcClientFactory, httpMetadataParser } = params;

  const socketCalls = new SocketCalls<Socket>();

  const server = new Server({
    transports: ['polling'],
    perMessageDeflate: false,
  });

  let globalConnectionId = 0;

  server.on('connection', (socket) => {
    const connectionId = `${nanoid()}-${String(++globalConnectionId)}`;

    const initialMetadata = httpMetadataParser(socket.request);
    const grpcClient = grpcClientFactory();
    const connectionLogger = logger.child({ connectionId });

    connectionLogger.info(`Polling socket is opened`);

    pollingConnectionsCount.inc();

    const socketSend = (data: Uint8Array) => {
      if (socket.readyState === 'open') {
        socket.send(data);
      }
    };

    const handleSocketMessage = createGrpcSocketProxy<Socket>({
      logger: connectionLogger,
      grpcClient,
      initialMetadata,
      socketCalls,
      socket,
      socketSend,
    });

    socket.on('message', (message) => {
      if (socket.readyState === 'open') {
        handleSocketMessage(message);
      }
    });

    socket.on('close', (reason) => {
      connectionLogger.info(
        'Polling socket is closed' + (reason ? ` (${reason})` : ''),
      );
      socketCalls.cancelSocketCalls(socket);
      grpcClient.close();
      pollingConnectionsCount.dec();
    });
  });

  return server;
}
