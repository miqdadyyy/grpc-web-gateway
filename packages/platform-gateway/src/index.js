/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const envSchema = require('env-schema');
const express = require('express');
const http = require('http');
const cors = require('cors');
const packageInfo = require('../package.json');
const { createServer: createGrpcGateway } = require('@dlghq/grpc-web-gateway');

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

app.use(cors({ origin: true }));

app.get('/info', (req, res) => {
  res.json({
    status: 'OK',
    data: {
      name: packageInfo.name,
      version: packageInfo.version,
    },
  });
});

createGrpcGateway({
  server,
  api: config.API_HOST,
  credentials: {
    type: config.API_SECURE ? 'ssl' : 'insecure',
  },
  filterHeaders(header) {
    switch (header) {
      case 'dn':
      case 'serial':
      case 'verified':
      case 'fingerprint':
      case 'client_cert':
        return true;

      default:
        if (header.startsWith('x-')) {
          return true;
        }

        return false;
    }
  },
});

server.listen(config.listen, error => {
  if (error) {
    throw error;
  } else {
    const listening = `http://${config.listen.host}:${config.listen.port}`;
    const proxying = `http${config.api.secure ? 's' : ''}://${config.api.host}`;
    console.info(
      `Gateway started. Listening ${listening}. Proxying ${proxying}.`,
    );
  }
});
