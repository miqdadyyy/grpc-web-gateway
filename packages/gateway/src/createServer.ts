// Copyright 2018 dialog LLC <info@dlg.im>

import type { Server as HttpServer } from 'http';
import { IncomingMessage } from 'http';
import type { Server as HttpsServer } from 'https';
import { nanoid } from 'nanoid';
import { Server as WebSocketServer } from 'ws';
import { Call, Client, ClientWritableStream, ServiceError } from 'grpc';
import {
  IErrorResponseBody,
  IRequest,
  Request,
  Response,
  ResponseType,
  Status,
} from '@dlghq/grpc-web-gateway-signaling';
import { logger } from './logger';
import { createMetadata, normalizeGrpcMetadata } from './grpcMetadata';
import { GrpcError } from './GrpcError';
import { setupPingConnections } from './heartbeat';
import { SocketCalls } from './socketCalls';
import { createMetadataParser, HeaderFilter } from './createMetadataParser';
import { createCredentials, CredentialsConfig } from './credentials';

export type GrpcGatewayServerConfig = {
  api: string;
  server: HttpServer | HttpsServer;
  credentials?: CredentialsConfig;
  heartbeatInterval?: number;
  filterHeaders: HeaderFilter;
};

const SECONDS = 1000;
const DEFAULT_HEARTBEAT_INTERVAL = 30 * SECONDS;

const SERIALIZER = (value: Uint8Array) =>
  Buffer.from(value.buffer, 0, value.buffer.byteLength);
const DESERIALIZER = (data: Buffer) => data;

const SERVICE_PONG_RESPONSE = createServicePongResponse();

export function createServer(config: GrpcGatewayServerConfig): WebSocketServer {
  const { heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL } = config;

  const parseMetadata = createMetadataParser(config.filterHeaders);

  const grpcCredentials = createCredentials(config.credentials);
  const createGrpcClient = () => new Client(config.api, grpcCredentials, {});

  const wsServer = new WebSocketServer({ server: config.server });
  const heartbeat = setupPingConnections(wsServer, heartbeatInterval);

  const socketCalls = new SocketCalls();

  wsServer.on('error', (error: Error) => {
    logger.error('WebSocket connection error:', error);
  });

  wsServer.on('connection', (ws, httpRequest: IncomingMessage) => {
    const connectionId = nanoid();
    heartbeat.addConnection(connectionId, ws);

    const initialMetadata = parseMetadata(httpRequest);
    const grpcClient = createGrpcClient();
    const connectionLogger = logger.child({ connectionId });

    ws.on('close', () => {
      logger.info('WebSocket is closed', connectionId);
      socketCalls.cancelSocketCalls(ws);
      grpcClient.close();
    });

    const wsSend = (data: Uint8Array) => {
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

      wsSend(createErrorResponse(requestId, payload));
    };

    const handleServerStreamResponse = (requestId: string, call: Call) => {
      connectionLogger.info('Handler server stream', requestId);

      call.on('data', (response: Uint8Array) => {
        connectionLogger.info('Push data to stream', requestId);
        wsSend(createPushResponse(requestId, response));
      });

      call.on('end', () => {
        connectionLogger.info('Stream was ended', requestId);
        wsSend(createEndResponse(requestId));
        socketCalls.removeCall(ws, requestId);
      });

      call.on('close', () => {
        connectionLogger.info('Closing stream', requestId);
        wsSend(createEndResponse(requestId));
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
            SERIALIZER,
            DESERIALIZER,
            payload,
            createMetadata(initialMetadata, metadata || {}),
          );

          socketCalls.setCall(ws, requestId, call);
          handleServerStreamResponse(requestId, call);
        } else {
          const call = grpcClient.makeUnaryRequest(
            path,
            SERIALIZER,
            DESERIALIZER,
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
                wsSend(createUnaryResponse(requestId, response));
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
            SERIALIZER,
            DESERIALIZER,
            createMetadata(initialMetadata, metadata || {}),
            {},
          );

          socketCalls.setCall(ws, requestId, call);
          handleServerStreamResponse(requestId, call);
        } else {
          const call = grpcClient.makeClientStreamRequest(
            path,
            SERIALIZER,
            DESERIALIZER,
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
                wsSend(createUnaryResponse(requestId, response));
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
          wsSend(createErrorResponseFromGrpcError(requestId, error));
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
        wsSend(SERVICE_PONG_RESPONSE);
      }
    });
  });

  return wsServer;
}

function parseRequestMessage(message: Buffer | unknown): IRequest {
  if (!(message instanceof Buffer)) {
    throw new Error('Message should be ArrayBuffer');
  }

  const data = new Uint8Array(message);
  const request = Request.decode(data);
  return Request.toObject(request);
}

function createServicePongResponse(): Uint8Array {
  return Request.encode({
    id: 'service',
    service: { pong: {} },
  }).finish();
}

function createErrorResponse(
  requestId: string,
  error: IErrorResponseBody,
): Uint8Array {
  return Response.encode({ id: requestId, error }).finish();
}

function createErrorResponseFromGrpcError(
  requestId: string,
  error: GrpcError,
): Uint8Array {
  return Response.encode({
    id: requestId,
    error: {
      status: error.statusCode,
      message: error.message,
    },
  }).finish();
}

function createUnaryResponse(
  requestId: string,
  payload: Uint8Array,
): Uint8Array {
  return Response.encode({ id: requestId, unary: { payload } }).finish();
}

function createPushResponse(
  requestId: string,
  payload: Uint8Array,
): Uint8Array {
  return Response.encode({ id: requestId, push: { payload } }).finish();
}

function createEndResponse(requestId: string): Uint8Array {
  return Response.encode({ id: requestId, end: {} }).finish();
}
