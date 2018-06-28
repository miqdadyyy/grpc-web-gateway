const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

class EchoService {
  echo(call, callback) {
    callback(null, call.request);
  }

  stream(call) {
    setInterval(() => call.write({ date: Date.now() }), 1000);
  }

  bidiStream(call) {
    call.write({ date: Date.now() })
    setInterval(() => call.write({ date: Date.now() }), 1000);

    call.on('data', (point) => {
      console.log(point);
      call.write(point)
    });

    call.on('end', () => call.end());
  }
}

const definition = protoLoader.loadSync(path.join(__dirname, 'proto/api.proto'), { keepCase: false });
const descriptor = grpc.loadPackageDefinition(definition);

const server = new grpc.Server();

server.addService(descriptor.example.Example.service, new EchoService());

server.bind('localhost:3000', grpc.ServerCredentials.createInsecure());
server.start();
