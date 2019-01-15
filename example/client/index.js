import { RpcClient, WebSocketTransport } from '../../src/client';
import { Ping, Pong } from './api.gen';

const client = new RpcClient(new WebSocketTransport('ws://localhost:8080'));

client
  .makeUnaryRequest({
    service: 'Test',
    method: 'Unary',
    payload: Ping.encode({ date: Date.now() }).finish(),
  })
  .toPromise()
  .then(Pong.decode)
  .then(console.log)
  .catch(console.error);

client
  .makeUnaryRequest({
    service: 'Test',
    method: 'Unary',
    payload: Ping.encode({ date: Date.now() }).finish(),
  })
  .toPromise()
  .then(Pong.decode)
  .then(console.log)
  .catch(console.error);

const serverStreamRequest = client.makeServerStreamRequest({
  service: 'Test',
  method: 'ServerStream',
  payload: Ping.encode({ date: Date.now() }).finish(),
});

serverStreamRequest.onMessage(response => {
  const message = Pong.decode(response);
  console.log(message);
});

serverStreamRequest.onError(error => {
  console.error(error);
});

serverStreamRequest.onEnd(() => {
  console.log('Stream ended');
});

const bidiStreamRequest = client.makeBidiStreamRequest({
  service: 'Test',
  method: 'BidiStream',
});

bidiStreamRequest.onMessage(response => {
  const message = Pong.decode(response);
  console.log(message);
});

bidiStreamRequest.onError(error => {
  console.error(error);
});

bidiStreamRequest.onEnd(() => {
  console.log('Bidi Stream ended');
});

setInterval(() => {
  console.log('Send to bidi stream');
  bidiStreamRequest.send({
    payload: Ping.encode({ date: Date.now() }).finish(),
  });
}, 1000);

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
