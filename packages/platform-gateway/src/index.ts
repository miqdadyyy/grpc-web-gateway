/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import envSchema from 'env-schema';
import express from 'express';
import http from 'http';
import cors from 'cors';
import packageInfo from '../package.json';
import { extractCorsConfigFromEnv } from './extractCorsConfigFromEnv';
import { createServer as createGrpcGateway } from '@dlghq/grpc-web-gateway';

console.log(`Starting gateway version: ${packageInfo.version}`);

const config = envSchema({
  dotenv: true,
  schema: {
    type: 'object',
    properties: {
      HOST: {
        type: 'string',
        default: '0.0.0.0',
      },
      PORT: {
        type: 'number',
        default: 8080,
      },
      API_HOST: {
        type: 'string',
        default: 'localhost:3000',
      },
      API_SECURE: {
        type: 'boolean',
        default: false,
      },
    },
  },
});

const app = express();
const server = http.createServer(app);

app.use(cors(extractCorsConfigFromEnv()));

app.get('/info', (_, response) => {
  response.json({
    status: 'OK',
    data: {
      name: packageInfo.name,
      version: packageInfo.version,
    },
  });
});

createGrpcGateway({
  server,
  api: config.API_HOST as string,
  credentials: {
    type: config.API_SECURE ? 'ssl' : 'insecure',
  },
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

const { HOST: host, PORT: port } = config;

server.listen({ host, port }, () => {
  const listening = `http://${host}:${port}`;
  const proxying = `http${config.API_SECURE ? 's' : ''}://${config.API_HOST}`;
  console.info(
    `Gateway started. Listening ${listening}. Proxying ${proxying}.`,
  );
});
