import { RpcClient, WebSocketTransport } from '../../src/client';
import { Ping, Pong } from './api.gen';


const client = new RpcClient(new WebSocketTransport('ws://localhost:8080'));

client.makeUnaryRequest({
  service: 'Test',
  method: 'Unary',
  payload: Ping.encode({ date: Date.now() }).finish()
})
  .map(Pong.decode)
  .spy('request')
  .observe(() => {});
