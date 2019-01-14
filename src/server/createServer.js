/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Server as HttpServer } from 'http';
import pino from 'pino';
import _ from 'lodash';
import nanoid from 'nanoid';
import { Server as WebSocketServer } from 'ws';
import { Client as GrpcClient, credentials as grpcCredentials } from 'grpc';

import { Request, Response } from '../shared/signaling';
import createMetadata from './createMetadata';

type Config = {
  api: string,
  server: HttpServer,
  heartbeatInterval?: number,
};

const SECONDS = 1000;
const DEFAULT_HEARTBEAT_INTERVAL = 30 * SECONDS;

function createServer(config: Config) {
  const logger = pino({ name: 'wss', prettyPrint: true });
  const { heartbeatInterval = DEFAULT_HEARTBEAT_INTERVAL } = config;
  const connectionsMap = new WeakMap();

  function noop() {}

  function heartbeat() {
    const wsMeta = connectionsMap.get(this);
    logger.info('Heartbeat', wsMeta ? wsMeta.id : 'undefined');
    connectionsMap.set(this, {
      isAlive: true,
      id: wsMeta ? wsMeta.id : nanoid(),
    });
  }

  const wss = new WebSocketServer({
    server: config.server,
  });

  wss.on('error', err => {
    logger.error('Connection error:', err);
  });

  wss.on('connection', ws => {
    const grpc = new GrpcClient(config.api, grpcCredentials.createInsecure());
    const id = nanoid();

    logger.info('Connection', id);
    connectionsMap.set(ws, { isAlive: true, id });

    ws.on('pong', heartbeat);

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
              logger.error('error: ', error);
            } else {
              logger.info('Unary Data', { response, id });
              ws.send(
                Response.encode({ id, unary: { payload: response } }).finish(),
              );
            }
          },
        );
      }
      // else if (request.push) {
      //   const { payload } = request.push;
      //   const path = '/' + service + '/' + method;
      //   const call = grpc.makeServerStreamRequest(
      //     path,
      //     _.identity,
      //     _.identity,
      //     payload,
      //     createMetadata(metadata),
      //     {},
      //   );
      //   call.on('data', response => {
      //     console.log('Stream Data', { response, id });
      //     ws.send(
      //       Response.encode({ id, push: { payload: response } }).finish(),
      //     );
      //   });
      // }
    });

    ws.on('close', () => {
      logger.info('Ws closed');
      grpc.close();
    });
  });

  const interval = setInterval(() => {
    logger.info('Clearing dead connections...');
    wss.clients.forEach(function each(ws) {
      const wsMeta = connectionsMap.get(ws);
      if (!wsMeta || wsMeta.isAlive === false) {
        logger.info(
          'Terminate dead connection',
          wsMeta ? wsMeta.id : 'undefined id',
        );
        return ws.terminate();
      }

      connectionsMap.set(ws, { isAlive: false, id: wsMeta.id });
      ws.ping(noop);
    });
  }, heartbeatInterval);

  return wss;
}

export default createServer;
