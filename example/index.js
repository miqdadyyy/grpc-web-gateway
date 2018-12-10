const fs = require('fs');
const path = require('path');
const express = require('express');
const createGrpcGateway = require('../src');

// starts gRPC server
require('./server');

const gateway = createGrpcGateway({
  api: {
    host: 'localhost:3000',
  },
  protoFiles: [path.join(__dirname, 'proto/api.proto')],
});

gateway.use(express.static(__dirname));

gateway.listen(8080);
