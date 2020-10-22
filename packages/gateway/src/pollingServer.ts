import { Server, Socket } from 'engine.io';
import { SocketCalls } from './socketCalls';
import { nanoid } from 'nanoid';
import { Client } from '@grpc/grpc-js';
import { MetadataParser } from './metadataParser';
import { logger } from './logger';
import { createGrpcSocketProxy } from './grpcSocketProxy';

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

  server.on('connection', (socket) => {
    const connectionId = nanoid();

    const initialMetadata = httpMetadataParser(socket.request);
    const grpcClient = grpcClientFactory();
    const connectionLogger = logger.child({ connectionId });

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

    socket.on('message', handleSocketMessage);

    socket.on('close', () => {
      logger.info('Polling transport is closed', connectionId);
      socketCalls.cancelSocketCalls(socket);
      grpcClient.close();
    });
  });

  return server;
}
