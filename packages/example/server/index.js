import fs from 'fs';
import path from 'path';
import http from 'http';
import express from 'express';
import * as protoLoader from '@grpc/proto-loader';

import { createServer as createGateway } from '../../gateway/src/';
import startGrpcServer from './grpc';

const apiHost = 'localhost:3000';
const gatewayHost = 8080;
const protoRoot = path.resolve(__dirname, '../proto/*.proto');

startGrpcServer({
  protoRoot,
  listen: apiHost,
});

const app = express();
const server = http.createServer(app);

createGateway({
  server,
  api: apiHost,
  protoFiles: [protoRoot],
  filterHeaders: () => true,
});

app.use(express.static(path.resolve(__dirname, '../dist')));

server.listen(gatewayHost, error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Example server started!');
    console.log(`gRPC endpoint: ${apiHost}`);
    console.log(`gRPC gateway: ${gatewayHost}`);
  }
});
