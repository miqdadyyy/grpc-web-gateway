import { Request } from '@dlghq/grpc-web-gateway-signaling';

export const DEFAULT_SUSPENDED_HEARTBEAT_INTERVAL = 1000;

export const SOCKET_CLOSE_CODE_NORMAL = 1000; // websocket code
export const SOCKET_CLOSE_CODE_SERIALIZATION_ERROR = 4001; // custom app code

export const SERVICE_PING_MESSAGE: Uint8Array = Request.encode({
  id: 'service',
  service: { ping: {} },
}).finish();

export const SERVICE_PONG_MESSAGE: Uint8Array = Request.encode({
  id: 'service',
  service: { pong: {} },
}).finish();

export function resolveInterval(
  interval: number | ((attempt: number) => number),
  attempt?: number,
): number {
  return interval instanceof Function ? interval(attempt ?? 0) : interval;
}
