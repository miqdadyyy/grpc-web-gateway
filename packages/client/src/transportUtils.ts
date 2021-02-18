import { Request } from '@dlghq/grpc-web-gateway-signaling';

export const SOCKET_CLOSE_CODE_NORMAL = 1000; // websocket code
export const SOCKET_CLOSE_CODE_TRANSPORT_ERROR = 4001; // custom app code
export const SOCKET_CLOSE_CODE_HEARTBEAT_ERROR = 4002; // custom app code
export const SOCKET_CLOSE_CODE_SERIALIZATION_ERROR = 4003; // custom app code

export const SERVICE_PING_MESSAGE: Uint8Array = Request.encode({
  id: 'service',
  service: { ping: {} },
}).finish();

export const SERVICE_PONG_MESSAGE: Uint8Array = Request.encode({
  id: 'service',
  service: { pong: {} },
}).finish();
