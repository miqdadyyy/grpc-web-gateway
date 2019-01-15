const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const glob = require('glob');

class TestService {
  unary(call, callback) {
    console.log(`[grpc] unary: ${JSON.stringify(call.request)}`);
    callback(null, { date: Date.now() });
  }

  serverStream(call, ...rest) {
    console.log(`[grpc] serverStream: ${JSON.stringify(call.request)}`);
    let i = 0;
    const iid = setInterval(() => {
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
    const iid = setInterval(() => call.write({ date: Date.now() }), 10000);

    call.on('data', message => {
      console.log(`[grpc] bidiStream:`, message);
      call.write({ date: Date.now() });
    });

    call.on('end', () => {
      clearInterval(iid);
      call.end();
      console.log(`[grpc] bidiStream ended`);
    });

    setTimeout(() => {
      clearInterval(iid);
      call.end();
      console.log(`[grpc] bidiStream ended`);
    }, 1000 * 15);
  }
}

function startGrpcServer({ protoRoot, listen }) {
  const protoFiles = glob.sync(protoRoot);
  const server = new grpc.Server();

  protoFiles.forEach(protoRoot => {
    const definition = protoLoader.loadSync(protoRoot, { keepCase: false });
    const descriptor = grpc.loadPackageDefinition(definition);

    Object.keys(definition).forEach(serviceName => {
      server.addService(descriptor[serviceName].service, new TestService());
    });
  });

  server.bind(listen, grpc.ServerCredentials.createInsecure());
  server.start();
}

export default startGrpcServer;
