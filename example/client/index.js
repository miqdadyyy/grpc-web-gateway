import RpcRuntime from '../../src/client/';
import api from './api.gen';

const { example: { Ping, Pong } } = api;

const runtime = new RpcRuntime({
  endpoints: ['http://localhost:8080']
});

console.log(Ping.encode({ date: 100500 }).finish());

runtime.makeUnaryRequest({
  service: 'example.Example',
  method: 'Echo',
  payload: Ping.encode({ date: 100500 }).finish(),
  token: 'test'
})
  .map(Pong.decode)
  .spy('request')
  .observe(() => {});
