const fs = require('fs');
const path = require('path');
const express = require('express');
const startGrpcServer = require('./grpc');
const createGrpcGateway = require('../../src/server');

const apiHost = 'localhost:3000';
const protoRoot = path.resolve(__dirname, '../proto/api.proto');

startGrpcServer({
  protoRoot,
  listen: apiHost
});

const gateway = createGrpcGateway({
  apiHost,
  protoRoot
});

gateway.use(express.static(path.resolve(__dirname, '../dist')));

gateway.listen(8080);
