import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';

const NOOP = () => {
  // Do nothing
};

export type HttpRequestHandler = (
  request: IncomingMessage,
  response: ServerResponse,
) => void;

export type HttpUpgradeHandler = (
  response: IncomingMessage,
  socket: Socket,
  head: Buffer,
) => void;

export type HttpRequestMiddleware = (
  next: HttpRequestHandler,
) => HttpRequestHandler;

export type HttpUpgradeMiddleware = (
  next: HttpUpgradeHandler,
) => HttpUpgradeHandler;

export const REQUEST_NOT_FOUND_MIDDLEWARE: HttpRequestMiddleware = () => (
  _,
  response,
) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write('No Path found');
  response.end();
};

export const CANCEL_UPGRADE_MIDDLEWARE: HttpUpgradeMiddleware = () => (
  _,
  socket,
) => {
  socket.destroy();
};

export function composeHttpRequestHandler(
  middlewares: Array<HttpRequestMiddleware>,
): HttpRequestHandler {
  return middlewares.reduceRight(
    (handler, middleware) => middleware(handler),
    NOOP as HttpRequestHandler,
  );
}

export function composeHttpUpgradeHandler(
  middlewares: Array<HttpUpgradeMiddleware>,
): HttpUpgradeHandler {
  return middlewares.reduceRight(
    (handler, middleware) => middleware(handler),
    NOOP as HttpUpgradeHandler,
  );
}
