// @flow strict

// Copyright 2018 dialog LLC <info@dlg.im>

import type { Server as HttpServer } from 'http';
import type { Server as HttpsServer } from 'https';
import nanoid from 'nanoid';
import { Server as WebSocketServer } from 'ws';
import grpc, { Client } from 'grpc';
import { identity } from 'lodash/fp';
import {
  type GrpcStatusCode,
  Request,
  Response,
} from '../../signaling/signaling';
import {
  createMetadataParser,
  type HeaderFilter,
} from './createMetadataParser';

// $FlowFixMe
import pkg from '../package.json';
import { logger } from './logger';
import { createCredentials, type CredentialsConfig } from './credentials';
import { createMetadata, normalizeGrpcMetadata } from './grpcMetadata';
import { GrpcError } from './GrpcError';
import { setupPingConnections } from './heartbeat';
import { SocketCalls } from './socketCalls';

export default createServer;

type GrpcGatewayServerConfig = {
  api: string,
  server: HttpServer | HttpsServer,
  credentials?: CredentialsConfig,
  heartbeatInterval?: number,
  filterHeaders: HeaderFilter,
  ...
};

const SECONDS = 1000;
const DEFAULT_HEARTBEAT_INTERVAL = 30 * SECONDS;

type GrpcStatus = {
  code: GrpcStatusCode,
  details: string,
  metadata?: { [string]: mixed, ... },
  ...
};

const SERVICE_PONG_RESPONSE = createServicePongResponse();

export function createServer(config: GrpcGatewayServerConfig) {
  const { heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL } = config;

  logger.info('Starting gateway version: ', pkg.version);

  const parseMetadata = createMetadataParser(config.filterHeaders);

  grpc.setLogger(logger);
  const grpcCredentials = createCredentials(config.credentials);
  const createGrpcClient = () => new Client(config.api, grpcCredentials, {});

  const wsServer = new WebSocketServer({ server: config.server });
  const heartbeat = setupPingConnections(wsServer, heartbeatInterval);

  const socketCalls = new SocketCalls();

  wsServer.on('error', (err: Error) => {
    logger.error('WebSocket connection error:', err);
  });

  wsServer.on('connection', (ws, httpRequest: http$IncomingMessage<>) => {
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

    const wsSend = data => {
      if (ws.readyState === ws.OPEN) {
        ws.send(data);
      }
    };

    const sendGrpcStatusErrorToSocket = (requestId, error: GrpcStatus) => {
      connectionLogger.info(`Sending error for request "${requestId}"`, error);

      wsSend(createErrorResponseFromGrpcStatus(requestId, error));
    };

    const handleServerStreamResponse = (requestId, call) => {
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

      call.on('error', (error: GrpcStatus) => {
        sendGrpcStatusErrorToSocket(requestId, error);
        socketCalls.removeCall(ws, requestId);
      });
    };

    ws.on('message', message => {
      let request;
      try {
        request = parseRequestMessage(message);
      } catch (error) {
        connectionLogger.error('Failed to parse a request', error);
        return;
      }

      const requestId = request.id;

      if (request.unary) {
        const {
          service,
          method,
          payload,
          metadata,
          responseType,
        } = request.unary;
        const path = `/${service}/${method}`;

        if (responseType === 'STREAM') {
          const call = grpcClient.makeServerStreamRequest(
            path,
            identity,
            identity,
            payload,
            createMetadata(initialMetadata, metadata || {}),
          );

          socketCalls.setCall(ws, requestId, call);
          handleServerStreamResponse(requestId, call);
        } else {
          const call = grpcClient.makeUnaryRequest(
            path,
            identity,
            identity,
            payload,
            createMetadata(initialMetadata, metadata || {}),
            {},
            (error: GrpcStatus, response: Uint8Array) => {
              socketCalls.removeCall(ws, requestId);

              if (error) {
                sendGrpcStatusErrorToSocket(requestId, error);
              } else {
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

        if (responseType === 'STREAM') {
          const call = grpcClient.makeBidiStreamRequest(
            path,
            identity,
            identity,
            createMetadata(initialMetadata, metadata || {}),
            {},
          );

          socketCalls.setCall(ws, requestId, call);
          handleServerStreamResponse(requestId, call);
        } else {
          const call = grpcClient.makeClientStreamRequest(
            path,
            identity,
            identity,
            createMetadata(initialMetadata, metadata || {}),
            {},
            (error: GrpcStatus, response: Uint8Array) => {
              socketCalls.removeCall(ws, requestId);

              if (error) {
                sendGrpcStatusErrorToSocket(requestId, error);
              } else {
                connectionLogger.debug(
                  'Send unary response for a client stream',
                  requestId,
                );
                wsSend(createUnaryResponse(requestId, response));
              }
            },
          );

          socketCalls.setCall(ws, requestId, call);

          call.on('error', (error: GrpcStatus) => {
            socketCalls.removeCall(ws, requestId);
            sendGrpcStatusErrorToSocket(requestId, error);
          });
        }
      }

      if (request.push) {
        const { payload } = request.push;

        const call = socketCalls.getCall(ws, requestId);
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
        const call = socketCalls.getCall(ws, requestId);
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

function parseRequestMessage(message: *): Request {
  if (!(message instanceof Buffer)) {
    throw new Error('Message should be ArrayBuffer');
  }

  return Request.toObject(Request.decode(new Uint8Array(message)), {
    enums: String,
  });
}

function createServicePongResponse(): Uint8Array {
  return Request.encode({
    id: 'service',
    service: { pong: {} },
  }).finish();
}

function createErrorResponseFromGrpcStatus(
  requestId: string,
  error: GrpcStatus,
): Uint8Array {
  return Response.encode({
    id: requestId,
    error: {
      status: error.code,
      message: error.details,
      metadata: error.metadata
        ? normalizeGrpcMetadata(error.metadata)
        : undefined,
    },
  }).finish();
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
