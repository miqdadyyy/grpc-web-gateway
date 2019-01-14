const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

class TestService {
  unary(call, callback) {
    console.log(`[grpc] unary: ${JSON.stringify(call.request)}`);
    callback(null, { date: Date.now() });
  }

  serverStream(call, ...rest) {
    console.log(`[grpc] serverStream: ${JSON.stringify(call.request)}`);
    const iid = setInterval(() => {
      console.log('Write');
      call.write({ date: Date.now() });
    }, 1000);
    setTimeout(() => {
      clearInterval(iid);
      call.end();
      console.log(`[grpc] serverStream ended`);
    }, 1000 * 10);
  }

  clientStream(call, callback) {
    call.on('data', message => {
      console.log(`[grpc] clientStream: ${message}`);
    });
    call.on('end', () => {
      callback(null, { date: Date.now() });
      console.log(`[grpc] clientStream ended`);
    });
  }

  bidiStream(call) {
    const iid = setInterval(() => call.write({ date: Date.now() }), 1000);

    call.on('data', message => {
      console.log(`[grpc] bidiStream: ${message}`);
    });

    call.on('end', () => {
      clearInterval(iid);
      call.end();
      console.log(`[grpc] bidiStream ended`);
    });
  }
}

function startGrpcServer({ protoRoot, listen }) {
  const definition = protoLoader.loadSync(protoRoot, { keepCase: false });
  const descriptor = grpc.loadPackageDefinition(definition);

  const server = new grpc.Server();

  server.addService(descriptor.Test.service, new TestService());

  server.bind(listen, grpc.ServerCredentials.createInsecure());
  server.start();
}

export default startGrpcServer;
