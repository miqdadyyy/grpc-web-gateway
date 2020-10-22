import { logger } from './logger';
import { IncomingMessage } from 'http';
import { nanoid } from 'nanoid';
import {
  Call,
  Client,
  ClientWritableStream,
  ServiceError,
} from '@grpc/grpc-js';
import {
  IErrorResponseBody,
  ResponseType,
  Status,
} from '@dlghq/grpc-web-gateway-signaling';
import { createMetadata, normalizeGrpcMetadata } from './grpcMetadata';
import { GrpcError } from './GrpcError';
import { Server as WebSocketServer } from 'ws';
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
import { SocketCalls } from './socketCalls';
import { setupPingConnections } from './heartbeat';
import { MetadataParser } from './metadataParser';
import { WebSocket } from './types';

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

    ws.on('close', () => {
      logger.info('WebSocket is closed', connectionId);
      socketCalls.cancelSocketCalls(ws);
      grpcClient.close();
    });

    const socketSend = (data: Uint8Array) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(data);
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
        socketCalls.removeCall(ws, requestId);
      });

      call.on('close', () => {
        connectionLogger.info('Closing stream', requestId);
        socketSend(createEndResponse(requestId));
        socketCalls.removeCall(ws, requestId);
      });

      call.on('error', (error) => {
        sendErrorToSocket(requestId, error);
        socketCalls.removeCall(ws, requestId);
      });
    };

    ws.on('message', (message) => {
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

          socketCalls.setCall(ws, requestId, call);
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
              socketCalls.removeCall(ws, requestId);

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

          socketCalls.setCall(ws, requestId, call);
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

          socketCalls.setCall(ws, requestId, call);
          handleServerStreamResponse(requestId, call);
        } else {
          const call = grpcClient.makeClientStreamRequest(
            path,
            serializeMessage,
            deserializeMessage,
            createMetadata(initialMetadata, metadata || {}),
            {},
            (error, response) => {
              socketCalls.removeCall(ws, requestId);

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

          socketCalls.setCall(ws, requestId, call);

          call.on('error', (error) => {
            socketCalls.removeCall(ws, requestId);
            sendErrorToSocket(requestId, error);
          });
        }
      }

      if (request.push && request.push.payload) {
        const { payload } = request.push;

        const call = socketCalls.getCall<ClientWritableStream<Uint8Array>>(
          ws,
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
          ws,
          requestId,
        );
        if (call) {
          connectionLogger.info('End request', requestId);
          socketCalls.removeCall(ws, requestId);
          call.end();
        }
      }

      if (request.cancel) {
        const { reason } = request.cancel;
        const call = socketCalls.getCall(ws, requestId);
        if (call) {
          connectionLogger.info('Cancel request', requestId, { reason });
          socketCalls.removeCall(ws, requestId);
          call.cancel();
        }
      }

      if (request.service && request.service.ping) {
        socketSend(SERVICE_PONG_RESPONSE);
      }
    });
  });

  return wsServer;
}
