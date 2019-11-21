// @flow strict

// Copyright 2018 dialog LLC <info@dlg.im>

import type { Server as HttpServer } from 'http';
import type { Server as HttpsServer } from 'https';
import nanoid from 'nanoid';
import { Server as WebSocketServer } from 'ws';
import grpc, { Client } from 'grpc';
import { identity, noop } from 'lodash/fp';
import {
  Request,
  Response,
  type GrpcStatusCode,
} from '../../signaling/signaling';
import {
  type HeaderFilter,
  createMetadataParser,
} from './createMetadataParser';

// $FlowFixMe
import pkg from '../package.json';
import { logger } from './logger';
import { createCredentials, type CredentialsConfig } from './credentials';
import { createMetadata, normalizeGrpcMetadata } from './grpcMetadata';
import { GrpcError } from './GrpcError';
import { setupPingConnections } from './heartbeat';

type GrpcGatewayServerConfig = {
  api: string,
  server: HttpServer | HttpsServer,
  protoFiles: Array<string>,
  credentials?: CredentialsConfig,
  heartbeatInterval?: number,
  filterHeaders: HeaderFilter,
};

const SECONDS = 1000;
const DEFAULT_HEARTBEAT_INTERVAL = 30 * SECONDS;

type GrpcStatus = {
  code: GrpcStatusCode,
  details: string,
  metadata?: { [string]: mixed },
};

export function createServer(config: GrpcGatewayServerConfig) {
  logger.info('Starting gateway version: ', pkg.version);

  const { heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL } = config;

  const wss = new WebSocketServer({
    server: config.server,
  });

  const parseMetadata = createMetadataParser(config.filterHeaders);

  const heartbeat = setupPingConnections(wss, heartbeatInterval);

  grpc.setLogger(logger);

  wss.on('error', (err: Error) => {
    logger.error('Connection error:', err);
  });

  wss.on('connection', (ws, httpRequest: http$IncomingMessage<>) => {
    const connectionId = nanoid();
    const initialMetadata = parseMetadata(httpRequest);

    heartbeat.addConnection(connectionId, ws);

    const calls = new Map();
    const grpcClient = new Client(
      config.api,
      createCredentials(config.credentials),
      {},
    );

    const connectionLogger = logger.child({ connectionId });
    const wsSend = (data, cb) =>
      ws.readyState === ws.OPEN ? ws.send(data, cb) : noop;

    const handleGrpcClientError = (requestId, error: GrpcStatus) => {
      connectionLogger.error(requestId, error);
      connectionLogger.info('Sending error', error);

      wsSend(
        Response.encode({
          id: requestId,
          error: {
            status: error.code,
            message: error.details,
            metadata: error.metadata
              ? normalizeGrpcMetadata(error.metadata)
              : undefined,
          },
        }).finish(),
      );
    };

    const handleGrpcError = (requestId, error) => {
      connectionLogger.error(error);
      wsSend(Response.encode({ id: requestId, error }).finish());
    };

    const handleServerStream = (id, call) => {
      connectionLogger.info('Handler server stream', id);

      call.on('data', (response: Uint8Array) => {
        connectionLogger.info('Push Data', id, response);
        wsSend(
          Response.encode({
            id,
            push: { payload: response },
          }).finish(),
        );
      });

      call.on('end', () => {
        connectionLogger.info('Stream was ended', id);
        wsSend(
          Response.encode({
            id,
            end: {},
          }).finish(),
        );
        calls.delete(id);
      });

      call.on('close', () => {
        connectionLogger.info('Closing stream', id);
        wsSend(
          Response.encode({
            id,
            end: {},
          }).finish(),
        );
        calls.delete(id);
      });

      call.on('error', (error: GrpcStatus) => {
        handleGrpcClientError(id, error);
      });
    };

    const processUnaryRequest = (id, unaryPayload) => {
      try {
        const { service, method, payload, metadata } = unaryPayload;
        const path = `/${service}/${method}`;
        if (unaryPayload.responseType === 'STREAM') {
          const call = grpcClient.makeServerStreamRequest(
            path,
            identity,
            identity,
            payload,
            createMetadata(initialMetadata, metadata || {}),
            {},
          );

          handleServerStream(id, call);
          calls.set(id, call);
        } else {
          const call = grpcClient.makeUnaryRequest(
            path,
            identity,
            identity,
            payload,
            createMetadata(initialMetadata, metadata || {}),
            {},
            (error: GrpcStatus, response: Uint8Array) => {
              if (error) {
                handleGrpcClientError(id, error);
              } else {
                connectionLogger.info('Unary Data', response);
                wsSend(
                  Response.encode({
                    id,
                    unary: { payload: response },
                  }).finish(),
                );
                calls.delete(id);
              }
            },
          );
          calls.set(id, call);
        }
      } catch (error) {
        handleGrpcError(id, error);
      }
    };

    const processStreamRequest = (id, streamPayload) => {
      try {
        const { service, method, metadata } = streamPayload;

        const path = `/${service}/${method}`;

        if (streamPayload.responseType === 'STREAM') {
          const call = grpcClient.makeBidiStreamRequest(
            path,
            identity,
            identity,
            createMetadata(initialMetadata, metadata || {}),
            {},
          );
          calls.set(id, call);

          handleServerStream(id, call);
        } else {
          const call = grpcClient.makeClientStreamRequest(
            path,
            identity,
            identity,
            createMetadata(initialMetadata, metadata || {}),
            {},
            (error: GrpcStatus, response: Uint8Array) => {
              if (error) {
                handleGrpcClientError(id, error);
              } else {
                connectionLogger.info('Client Stream Unary Response');
                wsSend(
                  Response.encode({
                    id,
                    unary: { payload: response },
                  }).finish(),
                );
              }
            },
          );
          calls.set(id, call);
          call.on('error', (error: GrpcStatus) => {
            handleGrpcClientError(id, error);
          });
        }
      } catch (error) {
        connectionLogger.error({ error });
        handleGrpcError(id, error);
      }
    };

    ws.on('message', message => {
      try {
        if (!(message instanceof Buffer))
          throw GrpcError.fromStatusName(
            'UNKNOWN',
            'Message should be ArrayBuffer',
          );
        const request = Request.toObject(
          Request.decode(new Uint8Array(message)),
          { enums: String },
        );
        const { id } = request;

        if (request.unary) {
          processUnaryRequest(id, request.unary);
        } else if (request.stream) {
          processStreamRequest(id, request.stream);
        } else if (request.push) {
          try {
            const { payload } = request.push;

            connectionLogger.info('Push request', id, payload);

            const call = calls.get(id);
            if (!call) {
              throw GrpcError.fromStatusName(
                'NOT_FOUND',
                `There is no opened stream with id ${id}. Probably this is server problem`,
              );
            }

            call.write(payload);
          } catch (error) {
            handleGrpcError(id, error);
          }
        } else if (request.end) {
          connectionLogger.info('End request');
          try {
            const call = calls.get(id);
            if (!call) {
              throw GrpcError.fromStatusName(
                'NOT_FOUND',
                `There is no opened stream with id ${id}. Probably this is server problem`,
              );
            }

            call.end();
            calls.delete(id);
          } catch (error) {
            handleGrpcError(id, error);
          }
        } else if (request.cancel) {
          const { reason } = request.cancel;
          connectionLogger.info('Cancel request');
          try {
            const call = calls.get(id);
            if (!call) {
              throw GrpcError.fromStatusName(
                'NOT_FOUND',
                `There is no opened stream with id ${id}. Probably this is server problem`,
              );
            }

            connectionLogger.info('Cancelling call', id, { reason });

            call.cancel();
            calls.delete(id);
          } catch (error) {
            handleGrpcError(id, error);
          }
        } else if (request.service) {
          if (request.service.ping) {
            ws.send(
              Request.encode({
                id: 'service',
                service: {
                  pong: {},
                },
              }).finish(),
            );
          }
        }
      } catch (e) {
        connectionLogger.error('Not a Request', e);
      }
    });

    ws.on('close', () => {
      logger.info('Ws closed');
      Array.from(calls.values()).forEach(call => call.cancel());
      grpcClient.close();
    });
  });

  return wss;
}

export default createServer;
