const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

class EchoService {
  echo(call, callback) {
    console.log(call);
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

function createGrpcServer({ protoRoot, listen }) {
  const definition = protoLoader.loadSync(protoRoot, { keepCase: false });
  const descriptor = grpc.loadPackageDefinition(definition);

  const server = new grpc.Server();

  server.addService(descriptor.example.Example.service, new EchoService());

  server.bind(listen, grpc.ServerCredentials.createInsecure());
  server.start();
}

module.exports = createGrpcServer;
