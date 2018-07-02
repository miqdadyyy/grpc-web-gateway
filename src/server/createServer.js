/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Server as HttpServer } from 'http';
import { Server as WebSocketServer } from 'ws';
import { Client as GrpcClient, credentials as grpcCredentials } from 'grpc';
import { Request, Response } from '../shared/signaling';

type Config = {
  api: string,
  server: HttpServer
};

function createServer(config: Config) {
  const wss = new WebSocketServer({
    server: config.server
  });

  wss.on('connection', (ws) => {
    const grpc = new GrpcClient(config.port, credentials.createInsecure());

    ws.on('message', (message) => {
      const request = Request.decode(message);
      console.log(request);
    });

    ws.on('close', () => {
      grpc.close();
    });
  });

  return wss;
}

export default createServer;
