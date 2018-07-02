const _ = require('lodash');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const express = require('express');
const expressWs = require('express-ws');
const bodyParser = require('body-parser');
const createMetadata = require('./createMetadata');

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

  const jsonParser = bodyParser.json();

  _.forEach(definition, (serviceDefinition, serviceName) => {
    _.forEach(serviceDefinition, (methodDefinition) => {
      const Service = _.get(package, serviceName);
      const createService = () => {
        return new Service(config.apiHost, grpc.credentials.createInsecure());
      };

      if (methodDefinition.requestStream && methodDefinition.responseStream) {
        app.ws(methodDefinition.path, (ws, req) => {
          const service = createService();
          const metadata = createMetadata(req);
          const call = service[methodDefinition.originalName](metadata);

          ws.on('message', (message) => {
            call.write(JSON.parse(message));
          });

          ws.on('close', () => {
            call.end();
          });

          const handleSendError = (error) => {
            if (error) {
              call.end();
              ws.close();
              console.error(error);
            }
          };

          call.on('data', (message) => {
            ws.send(JSON.stringify({ ok: true, payload: message }), handleSendError);
          });

          call.on('error', (error) => {
            ws.send(JSON.stringify({ ok: false, payload: error }), handleSendError);
          });

          call.on('end', () => {
            ws.close();
          });
        });
      } else if (methodDefinition.responseStream) {
        app.post(methodDefinition.path, jsonParser, (req, res) => {
          const service = createService();
          const metadata = createMetadata(req);
          const call = service[methodDefinition.originalName](req.body, metadata);

          let isHeadersSent = false;
          const sendHeaders = () => {
            if (!isHeadersSent) {
              isHeadersSent = true;
              res.writeHead(200, { 'content-type' : 'application/jsonstream' });
            }
          };

          call.on('data', (message) => {
            sendHeaders();
            res.write(JSON.stringify({ ok: true, payload: message }) + '\n');
          });

          call.on('error', (error) => {
            sendHeaders();
            res.write(JSON.stringify({ ok: false, payload: error }) + '\n');
          });

          call.on('end', () => {
            sendHeaders();
            res.end();
          });
        });
      } else if (methodDefinition.requestStream) {
        app.post(methodDefinition.path, (req, res) => {
          res.status(501);
          res.json({
            ok: false,
            payload: {
              code: 501,
              message: 'Not Implemented'
            }
          });
        });
      } else {
        app.post(methodDefinition.path, jsonParser, (req, res) => {
          const service = createService();
          const metadata = createMetadata(req);

          service[methodDefinition.originalName](req.body, metadata, (error, response) => {
            if (error) {
              res.status(500);
              res.json({
                ok: false,
                payload: error
              });
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
