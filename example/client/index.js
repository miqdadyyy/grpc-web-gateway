import { RpcClient, WebSocketTransport } from '../../src/client';
import api from './api.gen';

const { example: { Ping, Pong } } = api;

const client = new RpcClient(new WebSocketTransport('ws://localhost:8080'));

runtime.makeUnaryRequest({
  service: 'example.Example',
  method: 'Echo',
  payload: Ping.encode({ date: 100500 }).finish(),
  token: 'test'
})
  .map(Pong.decode)
  .spy('request')
  .observe(() => {});
