/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import express from 'express';
import http from 'http';
import cors from 'cors';
import packageInfo from '../package.json';
import {
  CorsConfig,
  parseCorsConfigFromEnv,
  parseServerConfigFromEnv,
} from './configParsers';
import {
  CANCEL_UPGRADE_MIDDLEWARE,
  composeHttpRequestHandler,
  composeHttpUpgradeHandler,
  createGrpcGatewayMiddlewares,
  HttpRequestMiddleware,
} from '@dlghq/grpc-web-gateway';
import { register } from 'prom-client';

console.log(`Starting gateway version: ${packageInfo.version}`);

const { host, port, apiHost, apiSecure } = parseServerConfigFromEnv();
const corsConfig = parseCorsConfigFromEnv();

const corsMiddleware = createCorsMiddleware(corsConfig);
const webAppMiddleware = createWebAppMiddleware();

const gatewayMiddlewares = createGrpcGatewayMiddlewares({
  api: apiHost,
  credentials: { type: apiSecure ? 'ssl' : 'insecure' },
  filterHeaders(header: string) {
    switch (header) {
      case 'dn':
      case 'serial':
      case 'verified':
      case 'fingerprint':
      case 'client_cert':
        return true;

      default:
        return header.startsWith('x-');
    }
  },
});

const httpServer = http.createServer();
httpServer.on(
  'request',
  composeHttpRequestHandler([
    corsMiddleware,
    gatewayMiddlewares.requestMiddleware,
    webAppMiddleware,
  ]),
);
httpServer.on(
  'upgrade',
  composeHttpUpgradeHandler([
    gatewayMiddlewares.upgradeMiddleware,
    CANCEL_UPGRADE_MIDDLEWARE,
  ]),
);

httpServer.listen({ host, port }, () => {
  const listening = `http://${host}:${port}`;
  const proxying = `http${apiSecure ? 's' : ''}://${apiHost}`;
  console.info(
    `Gateway started. Listening ${listening}. Proxying ${proxying}.`,
  );
});

function createCorsMiddleware(corsConfig: CorsConfig): HttpRequestMiddleware {
  const corsApp = express()
    .use(cors(corsConfig))
    .use(() => {
      // Prevent 404 response, will handled by the web app.
    });

  return (next) => (request, response) => {
    corsApp(request, response);
    if (request.method !== 'OPTIONS') {
      next(request, response);
    }
  };
}

function createWebAppMiddleware(): HttpRequestMiddleware {
  const app = express();

  app.get('/info', (_, response) => {
    response.json({
      status: 'OK',
      data: {
        name: packageInfo.name,
        version: packageInfo.version,
      },
    });
  });

  app.get('/metrics', async (req, res) => {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (error) {
      res.status(500).end(error);
    }
  });

  return () => app;
}
