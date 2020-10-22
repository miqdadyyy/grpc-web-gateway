import { Server, Socket } from 'engine.io';
import { SocketCalls } from './socketCalls';
import {
  createEndResponse,
  createErrorResponse,
  createErrorResponseFromGrpcError,
  createPushResponse,
  createUnaryResponse,
  deserializeMessage,
  parseRequestMessage,
  serializeMessage,
  SERVICE_PONG_RESPONSE,
} from './grpcUtils';
import { nanoid } from 'nanoid';
import {
  Call,
  Client,
  ClientWritableStream,
  ServiceError,
} from '@grpc/grpc-js';
import { MetadataParser } from './metadataParser';
import { logger } from './logger';
import {
  IErrorResponseBody,
  ResponseType,
  Status,
} from '@dlghq/grpc-web-gateway-signaling';
import { createMetadata, normalizeGrpcMetadata } from './grpcMetadata';
import { GrpcError } from './GrpcError';

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

    // TODO: Remove this debug log
    console.log('Connected to polling transport');
    console.log('headers', socket.request.headers);
    console.log('initialMetadata', initialMetadata);

    socket.on('close', () => {
      logger.info('Socket is closed', connectionId);
      socketCalls.cancelSocketCalls(socket);
      grpcClient.close();
    });

    const socketSend = (data: Uint8Array) => {
      if (socket.readyState === 'open') {
        socket.send(data);
      }
    };

    const sendErrorToSocket = (
      requestId: string,
      error: Error | ServiceError,
    ) => {
      let payload: IErrorResponseBody;
      if ('code' in error) {
        payload = {
          status: error.code as number,
          message: error.details,
          metadata: error.metadata
            ? normalizeGrpcMetadata(error.metadata)
            : undefined,
        };
      } else {
        payload = {
          status: Status.UNKNOWN,
          message: error.message,
        };
      }

      connectionLogger.info(
        `Sending error for request "${requestId}": ${payload.status}, ${payload.message}`,
      );

      socketSend(createErrorResponse(requestId, payload));
    };

    const handleServerStreamResponse = (requestId: string, call: Call) => {
      connectionLogger.info('Handler server stream', requestId);

      call.on('data', (response: Uint8Array) => {
        connectionLogger.info('Push data to stream', requestId);
        socketSend(createPushResponse(requestId, response));
      });

      call.on('end', () => {
        connectionLogger.info('Stream was ended', requestId);
        socketSend(createEndResponse(requestId));
        socketCalls.removeCall(socket, requestId);
      });

      call.on('close', () => {
        connectionLogger.info('Closing stream', requestId);
        socketSend(createEndResponse(requestId));
        socketCalls.removeCall(socket, requestId);
      });

      call.on('error', (error) => {
        sendErrorToSocket(requestId, error);
        socketCalls.removeCall(socket, requestId);
      });
    };

    socket.on('message', (message) => {
      let request;
      try {
        request = parseRequestMessage(message);
      } catch (error) {
        connectionLogger.error('Failed to parse a request', error);
        return;
      }

      if (!request) {
        return;
      }

      const requestId = request.id;
      if (!requestId) {
        connectionLogger.error('Missed ID of a request');
        return;
      }

      if (request.unary && request.unary.payload) {
        const {
          service,
          method,
          payload,
          metadata,
          responseType,
        } = request.unary;
        const path = `/${service}/${method}`;

        if (responseType === ResponseType.STREAM) {
          const call = grpcClient.makeServerStreamRequest(
            path,
            serializeMessage,
            deserializeMessage,
            payload,
            createMetadata(initialMetadata, metadata || {}),
          );

          socketCalls.setCall(socket, requestId, call);
          handleServerStreamResponse(requestId, call);
        } else {
          const call = grpcClient.makeUnaryRequest(
            path,
            serializeMessage,
            deserializeMessage,
            payload,
            createMetadata(initialMetadata, metadata || {}),
            {},
            (error, response) => {
              socketCalls.removeCall(socket, requestId);

              if (error) {
                sendErrorToSocket(requestId, error);
              } else if (response) {
                connectionLogger.debug(
                  'Send response for unary request',
                  requestId,
                );
                socketSend(createUnaryResponse(requestId, response));
              }
            },
          );

          socketCalls.setCall(socket, requestId, call);
        }
      }

      if (request.stream) {
        const { service, method, metadata, responseType } = request.stream;
        const path = `/${service}/${method}`;

        if (responseType === ResponseType.STREAM) {
          const call = grpcClient.makeBidiStreamRequest(
            path,
            serializeMessage,
            deserializeMessage,
            createMetadata(initialMetadata, metadata || {}),
            {},
          );

          socketCalls.setCall(socket, requestId, call);
          handleServerStreamResponse(requestId, call);
        } else {
          const call = grpcClient.makeClientStreamRequest(
            path,
            serializeMessage,
            deserializeMessage,
            createMetadata(initialMetadata, metadata || {}),
            {},
            (error, response) => {
              socketCalls.removeCall(socket, requestId);

              if (error) {
                sendErrorToSocket(requestId, error);
              } else if (response) {
                connectionLogger.debug(
                  'Send unary response for a client stream',
                  requestId,
                );
                socketSend(createUnaryResponse(requestId, response));
              }
            },
          );

          socketCalls.setCall(socket, requestId, call);

          call.on('error', (error) => {
            socketCalls.removeCall(socket, requestId);
            sendErrorToSocket(requestId, error);
          });
        }
      }

      if (request.push && request.push.payload) {
        const { payload } = request.push;

        const call = socketCalls.getCall<ClientWritableStream<Uint8Array>>(
          socket,
          requestId,
        );
        if (call) {
          connectionLogger.info('Push request', requestId);
          call.write(payload);
        } else {
          const error = GrpcError.fromStatusName(
            'NOT_FOUND',
            `There is no a call with id ${requestId}. Probably this is server problem`,
          );

          connectionLogger.error(error);
          socketSend(createErrorResponseFromGrpcError(requestId, error));
        }
      }

      if (request.end) {
        const call = socketCalls.getCall<ClientWritableStream<Uint8Array>>(
          socket,
          requestId,
        );
        if (call) {
          connectionLogger.info('End request', requestId);
          socketCalls.removeCall(socket, requestId);
          call.end();
        }
      }

      if (request.cancel) {
        const { reason } = request.cancel;
        const call = socketCalls.getCall(socket, requestId);
        if (call) {
          connectionLogger.info('Cancel request', requestId, { reason });
          socketCalls.removeCall(socket, requestId);
          call.cancel();
        }
      }

      if (request.service && request.service.ping) {
        socketSend(SERVICE_PONG_RESPONSE);
      }
    });
  });

  return server;
}
