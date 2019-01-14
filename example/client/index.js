import { RpcClient, WebSocketTransport } from '../../src/client';
import { Ping, Pong } from './api.gen';

const client = new RpcClient(new WebSocketTransport('ws://localhost:8080'));

client
  .makeUnaryRequest({
    service: 'Test',
    method: 'Unary',
    payload: Ping.encode({ date: Date.now() }).finish(),
  })
  .then(Pong.decode)
  .then(console.log);

client
  .makeUnaryRequest({
    service: 'Test',
    method: 'Unary',
    payload: Ping.encode({ date: Date.now() }).finish(),
  })
  .then(Pong.decode)
  .then(console.log);

// client
//   .makeServerStreamRequest({
//     service: 'Test',
//     method: 'ServerStream',
//     payload: Ping.encode({ date: Date.now() }).finish(),
//   })
//   .map(Pong.decode)
//   .log('server stream');

// // TODO: how to implement this?
// client.makeBidiStreamRequest({
//   service: 'Test',
//   method: 'BidiStream',
//   payload: Ping.encode({ date: Date.now() }).finish(),
// });
// // .map(Pong.decode)
// // .log('bidi stream');

// // TODO: how to implement this?
// client.makeClientStreamRequest({
//   service: 'Test',
//   method: 'ClientStream',
//   payload: Ping.encode({ date: Date.now() }).finish,
// });
// // .map(Pong.decode)
// // .log('client stream');
