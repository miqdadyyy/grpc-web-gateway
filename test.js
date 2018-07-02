const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const protoRoot = path.resolve(__dirname, 'example/proto/api.proto');
const definition = protoLoader.loadSync(protoRoot, {
  keepCase: false,
  includeDirs: [
    path.resolve(__dirname, 'example/proto')
  ]
});

console.log(definition);
const descriptor = grpc.loadPackageDefinition(definition);
