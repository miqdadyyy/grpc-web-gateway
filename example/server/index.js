import fs from 'fs';
import path from 'path';
import http from 'http';
import express from 'express';
import startGrpcServer from './grpc';
import createGateway from '../../src/server/createServer';

const apiHost = 'localhost:3000';
const gatewayHost = 8080;
const protoRoot = path.resolve(__dirname, '../proto/api.proto');

startGrpcServer({
  protoRoot,
  listen: apiHost,
});

const app = express();
const server = http.createServer(app);

createGateway({
  server,
  api: apiHost,
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
