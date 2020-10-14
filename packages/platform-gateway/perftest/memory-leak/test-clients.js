const WebSocket = require('ws');
const { Request } = require('@dlghq/grpc-web-gateway-signaling');

const ENDPOINT = 'ws://localhost:8080';
const AUTH_TOKEN = 'blabla';
const REQUEST_COUNT = 1000;
const REQUEST_INTERVAL = 1000;

for (let i = 1; i <= REQUEST_COUNT; i++) {
  try {
    const ws = new WebSocket(ENDPOINT);
    ws.on('open', () => {
      console.log(`Connect client #${i}`);
      ws.send(createRequest());

      setInterval(() => ws.send(createRequest()), REQUEST_INTERVAL);
    });
    ws.on('error', error => {
      console.log(`Error client #${i}`, error);
    });
  } catch (error) {
    console.error(`Failed to connect a client #${i}`, error);
  }
}

function createRequest() {
  return Request.encode({
    id: randomId(),
    unary: {
      service: 'Permissions',
      method: 'UnknownMethod',
      payload: new Uint8Array(0),
      metadata: { 'x-auth-ticket': AUTH_TOKEN },
    },
  }).finish();
}

function randomId() {
  return `${Date.now()}-${Math.abs((Math.random() * 1e10) | 0)}`;
}
