const _ = require('lodash');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const schema = require('protocol-buffers-schema')
const express = require('express');
const expressWs = require('express-ws');
const bodyParser = require('body-parser');

function createGrpcGateway(config) {
  const app = express();
  expressWs(app);

  const definition = protoLoader.loadSync(config.protoRoot, {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true
  });

  const package = grpc.loadPackageDefinition(definition);

  _.forEach(definition, (serviceDefinition, serviceName) => {
    _.forEach(serviceDefinition, (methodDefinition) => {

      if (methodDefinition.requestStream && methodDefinition.responseStream) {
        app.ws(methodDefinition.path, (ws, req) => {
          const service = new (_.get(package, serviceName))(config.apiHost, grpc.credentials.createInsecure());
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
        app.post(methodDefinition.path, bodyParser.json(), (req, res) => {
          const service = new (_.get(package, serviceName))(config.apiHost, grpc.credentials.createInsecure());
          service[methodDefinition.originalName](req.body, (error, response) => {
            if (error) {
              res.status(500);
              console.error(error);
              res.json({ code: error.code, message: error.message });
            } else {
              res.json(response);
            }
          });
        });
      }
    });
  });

  return app;
}

module.exports = createGrpcGateway;
