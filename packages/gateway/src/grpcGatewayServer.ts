// Copyright 2018 dialog LLC <info@dlg.im>

import type { Server as HttpServer } from 'http';
import type { Server as HttpsServer } from 'https';
import url from 'url';
import { Client } from '@grpc/grpc-js';
import { createMetadataParser, HeaderFilter } from './metadataParser';
import { createCredentials, CredentialsConfig } from './credentials';
import { createWebSocketServer } from './webSocketServer';
import { createPollingServer } from './pollingServer';
import {
  CANCEL_UPGRADE_MIDDLEWARE,
  composeHttpRequestHandler,
  composeHttpUpgradeHandler,
  HttpRequestMiddleware,
  HttpUpgradeMiddleware,
  REQUEST_NOT_FOUND_MIDDLEWARE,
} from './httpMiddleware';

const SECONDS = 1000;
const DEFAULT_HEARTBEAT_INTERVAL = 30 * SECONDS;
const DEFAULT_WEBSOCKET_ENDPOINT = '/';
const DEFAULT_POLLING_ENDPOINT = '/polling';

export type GrpcGatewayServerConfig = {
  api: string;
  filterHeaders: HeaderFilter;
  credentials?: CredentialsConfig;
  heartbeatInterval?: number;
  webSocketEndpoint?: string;
  pollingEndpoint?: string;
};

export function attachGrpcGatewayServer(
  httpServer: HttpServer | HttpsServer,
  config: GrpcGatewayServerConfig,
): void {
  const { requestMiddleware, upgradeMiddleware } = createGrpcGatewayMiddlewares(
    config,
  );

  httpServer.on(
    'request',
    composeHttpRequestHandler([
      requestMiddleware,
      REQUEST_NOT_FOUND_MIDDLEWARE,
    ]),
  );

  httpServer.on(
    'upgrade',
    composeHttpUpgradeHandler([upgradeMiddleware, CANCEL_UPGRADE_MIDDLEWARE]),
  );
}

export type GrpcGatewayMiddlewares = {
  requestMiddleware: HttpRequestMiddleware;
  upgradeMiddleware: HttpUpgradeMiddleware;
};

export function createGrpcGatewayMiddlewares(
  config: GrpcGatewayServerConfig,
): GrpcGatewayMiddlewares {
  const {
    heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL,
    webSocketEndpoint = DEFAULT_WEBSOCKET_ENDPOINT,
    pollingEndpoint = DEFAULT_POLLING_ENDPOINT,
  } = config;

  const httpMetadataParser = createMetadataParser(config.filterHeaders);

  const grpcCredentials = createCredentials(config.credentials);
  const grpcClientFactory = () => new Client(config.api, grpcCredentials, {});

  const wsServer = createWebSocketServer({
    heartbeatInterval,
    grpcClientFactory,
    httpMetadataParser,
  });

  const pollingServer = createPollingServer({
    grpcClientFactory,
    httpMetadataParser,
  });

  const isWebSocketEndpoint = createEndpointPredicate(webSocketEndpoint);
  const isPollingEndpoint = createEndpointPredicate(pollingEndpoint);

  const requestMiddleware: HttpRequestMiddleware = (next) => (
    request,
    response,
  ) => {
    if (isPollingEndpoint(request.url)) {
      pollingServer.handleRequest(request, response);
    } else {
      next(request, response);
    }
  };

  const upgradeMiddleware: HttpUpgradeMiddleware = (next) => (
    request,
    socket,
    head,
  ) => {
    if (isWebSocketEndpoint(request.url)) {
      wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request);
      });
    } else if (isPollingEndpoint(request.url)) {
      pollingServer.handleUpgrade(request, socket, head);
    } else {
      next(request, socket, head);
    }
  };

  return {
    requestMiddleware,
    upgradeMiddleware,
  };
}

function createEndpointPredicate(endpointPath: string) {
  const endpointPathWithSlash = endpointPath + '/';

  return (requestUrl?: string): boolean => {
    if (!requestUrl) {
      return false;
    }

    const pathname = url.parse(requestUrl).pathname;
    return pathname === endpointPath || pathname === endpointPathWithSlash;
  };
}
