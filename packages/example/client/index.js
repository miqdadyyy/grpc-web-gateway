// @flow

import {
  RpcClient,
  RetryWsTransport,
  WebSocketTransport,
  type Transport,
  type StatusfulTransport,
} from '@dlghq/grpc-web-gateway-client';
import {
  createWebsocketTransport,
  createWebsocketTransportFactory,
  retryTransportDecorator,
  heartbeatTransportDecorator,
  map,
  chain,
  type Factory,
} from '@dlghq/grpc-web-gateway-client/src/transports';
import { RxRpcClient } from '@dlghq/rx-grpc-web-gateway-client';
import { pipe } from 'lodash/fp';

import { Ping, Pong, Bytes, Long } from './api.gen';

const endpoint = 'ws://localhost:8080';
const makeClient = pipe(
  createWebsocketTransportFactory,
  map(heartbeatTransportDecorator()),
  retryTransportDecorator(),
  transport => new RpcClient(transport),
  rpcClient => new RxRpcClient(rpcClient),
);

const rxClient = makeClient(endpoint);

// rxClient
//   .makeUnaryRequest({
//     service: 'Test',
//     method: 'Unary',
//     payload: Ping.encode({ date: Date.now() }).finish(),
//   })
//   .execute()
//   .toPromise()
//   .then(Pong.decode)
//   .then(console.log)
//   .catch(console.error);

// rxClient
//   .makeUnaryRequest({
//     service: 'Test',
//     method: 'UnaryBytes',
//     payload: Bytes.encode({
//       byteString: { value: 'AQAAAAsUCIGSAxIAGAIYCBgFGAYgoYLk1gY=' },
//     }).finish(),
//   })
//   .execute()
//   .toPromise()
//   .then(Bytes.decode)
//   .then(console.log)
//   .catch(console.error);
console.log(
  'Long source',
  Long.encode({
    long: '-6580904714293305126',
  }).finish(),
);
rxClient
  .makeUnaryRequest({
    service: 'Test',
    method: 'Long',
    payload: Long.encode({
      long: '-6580904714293305126',
    }).finish(),
  })
  .execute()
  .toPromise()
  .then(resp => (console.log({ resp }), Long.decode(resp)))
  .then(console.log)
  .catch(console.error);

// const serverStreamRequest = rxClient.makeServerStreamRequest({
//   service: 'Test',
//   method: 'ServerStream',
//   payload: Ping.encode({ date: Date.now() }).finish(),
// });

// serverStreamRequest.execute().subscribe({
//   next: response => {
//     const message = Pong.decode(response);
//     console.log('Server stream', message);
//   },
//   error: error => {
//     console.error('Server stream', error);
//   },
//   complete: () => {
//     console.log('ServerStream ended');
//   },
// });

// // setTimeout(() => serverStreamRequest.cancel('SS reason'), 3000);

// const bidiStreamRequest = rxClient.makeBidiStreamRequest({
//   service: 'Test',
//   method: 'BidiStream',
// });

// bidiStreamRequest.send({
//   payload: Ping.encode({ date: Date.now() }).finish(),
// });

// bidiStreamRequest.execute().subscribe({
//   next: response => {
//     const message = Pong.decode(response);
//     console.log('Bidi stream', message);
//   },
//   error: error => {
//     console.error('Bidi stream', error);
//   },
//   complete: () => {
//     console.log('Bidi Stream ended');
//   },
// });

// // setTimeout(() => bidiStreamRequest.cancel('BS reason'), 4000);

// setInterval(() => {
//   console.log('Send to bidi stream');
//   bidiStreamRequest.send({
//     payload: Ping.encode({ date: Date.now() }).finish(),
//   });
// }, 1000);

// setTimeout(() => {
//   console.log('Closing bidi stream');

//   bidiStreamRequest.end();
// }, 11000);

// const clientStreamRequest = rxClient.makeClientStreamRequest({
//   service: 'Test',
//   method: 'ClientStream',
// });

// clientStreamRequest.execute().subscribe({
//   next: response => {
//     const message = Pong.decode(response);
//     console.log('Client stream', message);
//   },
//   error: error => {
//     console.error('Client stream', error);
//   },
//   complete: () => {
//     console.log('Client Stream ended');
//   },
// });

// setInterval(() => {
//   console.log('Send to client stream');
//   clientStreamRequest.send({
//     payload: Ping.encode({ date: Date.now() }).finish(),
//   });
// }, 1000);

// setTimeout(() => {
//   console.log('Closing client stream');

//   clientStreamRequest.end();
// }, 12000);

// setTimeout(() => clientStreamRequest.cancel('CS reason'), 4000);

// TODO: how to implement this?
// client.makeBidiStreamRequest({
//   service: 'Test',
//   method: 'BidiStream',
//   payload: Ping.encode({ date: Date.now() }).finish(),
// });
// .map(Pong.decode)
// .log('bidi stream');

// TODO: how to implement this?
// client.makeClientStreamRequest({
//   service: 'Test',
//   method: 'ClientStream',
//   payload: Ping.encode({ date: Date.now() }).finish,
// });
// .map(Pong.decode)
// .log('client stream');
