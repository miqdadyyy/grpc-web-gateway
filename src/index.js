const _ = require('lodash');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const express = require('express');
const cors = require('cors');
const expressWs = require('express-ws');
const bodyParser = require('body-parser');
const pino = require('pino');
const createMetadata = require('./createMetadata');
const mapErrorToHttp = require('./mapErrorToHttp');

function createGrpcGateway(config) {
  const app = express();
  expressWs(app);

  app.logger = pino({
    name: 'grpc-gateway',
    level: config.logLevel || 'debug'
  });

  app.set('etag', false);
  app.set('x-powered-by', false);

  if (config.cors) {
    app.use(cors({
      methods: ['GET', 'POST'],
      allowedHeaders: ['accept', 'content-type', 'authorization'],
      maxAge: 24 * 60 * 60
    }));
  }

  const jsonParser = bodyParser.json();

  _.forEach(config.protoFiles, (protoRoot) => {
    const definition = protoLoader.loadSync(protoRoot, {
      longs: String,
      enums: String,
      bytes: String,
      arrays: true,
      defaults: true,
      keepCase: false,
      includeDirs: config.protoInclude
    });
    const package = grpc.loadPackageDefinition(definition);

    _.forEach(definition, (serviceDefinition, serviceName) => {
      _.forEach(serviceDefinition, (methodDefinition) => {
        const Service = _.get(package, serviceName);
        const createService = () => new Service(config.apiHost, grpc.credentials.createInsecure());

        app.logger.debug(`register route ${methodDefinition.path}`);
        if (methodDefinition.requestStream && methodDefinition.responseStream) {
          app.ws(methodDefinition.path, (ws, req) => {
            const service = createService();
            const metadata = createMetadata(req);
            const call = service[methodDefinition.originalName](metadata);

            const handleError = (error) => {
              if (error) {
                call.end();
                ws.close();
                app.logger.error(error);
              }
            };

            ws.on('message', (json) => {
              try {
                const message = JSON.parse(json);
                call.write(message);
              } catch (error) {
                handleError(error);
              }
            });

            ws.on('close', () => {
              call.end();
            });

            call.on('data', (message) => {
              const json = JSON.stringify({ ok: true, payload: message });
              ws.send(json, handleError);
            });

            call.on('error', (error) => {
              const json = JSON.stringify({ ok: false, payload: mapErrorToHttp(error) });
              ws.send(json, handleError);
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

            req.on('close', () => {
              call.cancel();
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

            const method = service[methodDefinition.originalName];
            const call = method.call(service, req.body, metadata, (error, response) => {
              if (error) {
                const outError = mapErrorToHttp(error);
                res.status(outError.status);
                res.json({
                  ok: false,
                  payload: outError
                });
              } else {
                res.json({
                  ok: true,
                  payload: response
                });
              }
            });

            req.on('close', () => {
              call.cancel();
            });
          });
        }
      });
    });
  });

  app.use((req, res, next) => {
    res.status(404);
    res.json({
      ok: false,
      payload: {
        code: 404,
        message: 'Not Found'
      }
    });
  });

  app.use((error, req, res, next) => {
    app.logger.error(error);

    res.status(500);
    res.json({
      ok: false,
      payload: {
        code: 500,
        message: 'Internal Error'
      }
    });
  });

  return app;
}

module.exports = createGrpcGateway;
