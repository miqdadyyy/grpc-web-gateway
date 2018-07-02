const _ = require('lodash');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const schema = require('protocol-buffers-schema')
const express = require('express');
const expressWs = require('express-ws');
const bodyParser = require('body-parser');
const convertHeaders = require('./utils/convertHeaders');

function createGrpcGateway(config) {
  const app = express();
  expressWs(app);

  app.set('etag', false);
  app.set('x-powered-by', false);

  const definition = protoLoader.loadSync(config.protoRoot, {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true
  });

  const package = grpc.loadPackageDefinition(definition);

  const rawMiddleware = bodyParser.raw({
    limit: '100mb',
    type: [
      'application/grpc-web',
      'application/grpc-web+proto'
    ]
  });

  _.forEach(definition, (serviceDefinition, serviceName) => {
    const Service = _.get(package, serviceName);
    _.forEach(serviceDefinition, (methodDefinition) => {
      if (methodDefinition.requestStream && methodDefinition.responseStream) {
        app.ws(methodDefinition.path, (ws, req) => {
          const service = new Service(config.apiHost, grpc.credentials.createInsecure());
          const call = service[methodDefinition.originalName]();

          ws.on('message', (message) => {
            call.write(JSON.parse(message));
          });

          ws.on('close', () => {
            call.end();
          });

          call.on('data', (message) => {
            ws.send(JSON.stringify(message), (error) => {
              if (error) {
                console.error(error);
              }
            });
          })

          call.on('end', () => {
            ws.close();
          });
        });
      } else {
        app.post(methodDefinition.path, rawMiddleware, (req, res) => {
          const service = new Service(config.apiHost, grpc.credentials.createInsecure());

          const method = service[methodDefinition.originalName];
          const grpcRequest = method.requestDeserialize(req.body);
          const grpcMetadata = convertHeaders(req.headers);

          method.call(service, grpcRequest, grpcMetadata, (error, response) => {
            if (error) {
              res.status(500);
              console.error(error);
              res.json({ code: error.code, message: error.message });
            } else {
              if (req.accepts('application/grpc-web')) {
                res.send(method.responseSerialize(response));
              } else if (req.accepts('application/grpc-web+json')) {
                res.send(JSON.stringify(response));
              } else {
                res.status(406);
              }
            }
          });
        });
      }
    });
  });

  return app;
}

module.exports = createGrpcGateway;
