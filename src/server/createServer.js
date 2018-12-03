/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Server as HttpServer } from 'http';
import _ from 'lodash';
import { Server as WebSocketServer } from 'ws';
import { Client as GrpcClient, credentials as grpcCredentials } from 'grpc';
import { Request, Response } from '../shared/signaling';
import createMetadata from './createMetadata';

type Config = {
  api: string,
  server: HttpServer,
};

function createServer(config: Config) {
  const wss = new WebSocketServer({
    server: config.server,
  });

  wss.on('connection', ws => {
    const grpc = new GrpcClient(config.api, grpcCredentials.createInsecure());

    ws.on('message', message => {
      const request = Request.decode(message);
      const { id } = request;
      if (request.unary) {
        const { service, method, payload, metadata } = request.unary;
        const path = '/' + service + '/' + method;
        const call = grpc.makeUnaryRequest(
          path,
          _.identity,
          _.identity,
          payload,
          createMetadata(metadata),
          {},
          (error: Error, response: Uint8Array) => {
            if (error) {
              console.error('error: ', error);
            } else {
              ws.send(
                Response.encode({ id, unary: { payload: response } }).finish(),
              );
            }
          },
        );
      }
    });

    ws.on('close', () => {
      grpc.close();
    });
  });

  return wss;
}

export default createServer;
