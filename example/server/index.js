const fs = require('fs');
const path = require('path');
const express = require('express');
import http from 'http';
import startGrpcServer from './grpc';
import createGateway from '../../src/server/createServer';

const apiHost = 'localhost:3000';
const protoRoot = path.resolve(__dirname, '../proto/api.proto');

startGrpcServer({
  protoRoot,
  listen: apiHost
});

const app = express();
const server = http.createServer(app);

createGateway({
  server,
  api: apiHost
});

app.use(express.static(path.resolve(__dirname, '../dist')));

server.listen(8080);
