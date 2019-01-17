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
  console.log('Server stream', message);
});

serverStreamRequest.onError(error => {
  console.error('Server stream', error);
});

serverStreamRequest.onEnd(() => {
  console.log('ServerStream ended');
});

serverStreamRequest.onCancel(() => {
  console.log('ServerStream cancelled');
});

// setTimeout(() => serverStreamRequest.cancel('SS reason'), 3000);

const bidiStreamRequest = client.makeBidiStreamRequest({
  service: 'Test',
  method: 'BidiStream',
});

bidiStreamRequest.onMessage(response => {
  const message = Pong.decode(response);
  console.log('Bidi stream', message);
});

bidiStreamRequest.onError(error => {
  console.error('Bidi stream', error);
});

bidiStreamRequest.onEnd(() => {
  console.log('Bidi Stream ended');
});

bidiStreamRequest.onCancel(() => {
  console.log('BidiStream cancelled');
});

// setTimeout(() => bidiStreamRequest.cancel('BS reason'), 4000);

setInterval(() => {
  console.log('Send to bidi stream');
  bidiStreamRequest.send({
    payload: Ping.encode({ date: Date.now() }).finish(),
  });
}, 1000);

setTimeout(() => {
  console.log('Closing bidi stream');

  bidiStreamRequest.end();
}, 11000);

const clientStreamRequest = client.makeClientStreamRequest({
  service: 'Test',
  method: 'ClientStream',
});

clientStreamRequest.onMessage(response => {
  const message = Pong.decode(response);
  console.log('Client stream', message);
});

clientStreamRequest.onError(error => {
  console.error('Client stream', error);
});

clientStreamRequest.onEnd(() => {
  console.log('Client Stream ended');
});

clientStreamRequest.onCancel(() => {
  console.log('ClientStream cancelled');
});

setInterval(() => {
  console.log('Send to client stream');
  clientStreamRequest.send({
    payload: Ping.encode({ date: Date.now() }).finish(),
  });
}, 1000);

setTimeout(() => {
  console.log('Closing client stream');

  clientStreamRequest.end();
}, 12000);

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
