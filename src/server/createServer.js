/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import WebSocket from 'ws';
import { Client as GrpcClient, credentials as grpcCredentials } from 'grpc';
import { Request, Response } from '../shared/signaling';

type Config = {
  api: string,
  port: number
};

function createServer(config: Config) {
  const wss = new WebSocket.Server(config);

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
}

export default createServer;
