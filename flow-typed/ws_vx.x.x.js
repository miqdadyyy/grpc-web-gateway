// @flow

declare module 'ws' {
  import type { Server as HttpServer } from 'http';
  import type { Server as HttpsServer } from 'https';

  declare type Data =
    | string
    | Buffer
    | ArrayBuffer
    | Buffer[]
    | typeof Uint8Array.prototype;

  /**
   * CertMeta represents the accepted types for certificate & key data.
   */
  declare type CertMeta = string | string[] | Buffer | Buffer[];

  /**
   * VerifyClientCallbackSync is a synchronous callback used to inspect the
   * incoming message. The return value (boolean) of the function determines
   * whether or not to accept the handshake.
   */
  declare type VerifyClientCallbackSync = (info: {
    origin: string,
    secure: boolean,
    req: http$IncomingMessage<>,
  }) => boolean;

  /**
   * VerifyClientCallbackAsync is an asynchronous callback used to inspect the
   * incoming message. The return value (boolean) of the function determines
   * whether or not to accept the handshake.
   */
  declare type VerifyClientCallbackAsync = (
    info: { origin: string, secure: boolean, req: http$IncomingMessage<> },
    callback: (
      res: boolean,
      code?: number,
      message?: string,
      headers?: Object,
    ) => void,
  ) => void;

  declare interface ClientOptions {
    protocol?: string;
    handshakeTimeout?: number;
    perMessageDeflate?: boolean | PerMessageDeflateOptions;
    localAddress?: string;
    protocolVersion?: number;
    headers?: { [key: string]: string };
    origin?: string;
    agent?: http$Agent<>;
    host?: string;
    family?: number;
    checkServerIdentity: (servername: string, cert: CertMeta) => boolean;
    rejectUnauthorized?: boolean;
    passphrase?: string;
    ciphers?: string;
    cert?: CertMeta;
    key?: CertMeta;
    pfx?: string | Buffer;
    ca?: CertMeta;
    maxPayload?: number;
  }

  declare interface PerMessageDeflateOptions {
    serverNoContextTakeover?: boolean;
    clientNoContextTakeover?: boolean;
    serverMaxWindowBits?: number;
    clientMaxWindowBits?: number;
    zlibDeflateOptions?: {
      flush?: number,
      finishFlush?: number,
      chunkSize?: number,
      windowBits?: number,
      level?: number,
      memLevel?: number,
      strategy?: number,
      dictionary?: Buffer | Buffer[] | DataView,
      info?: boolean,
    };
    threshold?: number;
    concurrencyLimit?: number;
  }

  declare interface ServerOptions {
    host?: string;
    port?: number;
    backlog?: number;
    server?: HttpServer | HttpsServer;
    verifyClient?: VerifyClientCallbackAsync | VerifyClientCallbackSync;
    handleProtocols?: any;
    path?: string;
    noServer?: boolean;
    clientTracking?: boolean;
    perMessageDeflate?: boolean | PerMessageDeflateOptions;
    maxPayload?: number;
  }

  declare interface AddressInfo {
    address: string;
    family: string;
    port: number;
  }
  // WebSocket socket.
  declare class WebSocket {
    static CONNECTING: number;
    static OPEN: number;
    static CLOSING: number;
    static CLOSED: number;

    binaryType: string;
    bufferedAmount: number;
    extensions: string;
    protocol: string;
    readyState: number;
    url: string;

    clients: Array<WebSocket>;

    CONNECTING: number;
    OPEN: number;
    CLOSING: number;
    CLOSED: number;

    onopen: (event: { target: WebSocket }) => void;
    onerror: (event: {
      error: any,
      message: string,
      type: string,
      target: WebSocket,
    }) => void;
    onclose: (event: {
      wasClean: boolean,
      code: number,
      reason: string,
      target: WebSocket,
    }) => void;
    onmessage: (event: {
      data: Data,
      type: string,
      target: WebSocket,
    }) => void;

    constructor(address: string, options?: ClientOptions): this;
    constructor(
      address: string,
      protocols?: string | string[],
      options?: ClientOptions,
    ): this;

    close(code?: number, data?: string): void;
    ping(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    pong(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    send(data: any, cb?: (err?: Error) => void): void;
    send(
      data: any,
      options: {
        mask?: boolean,
        binary?: boolean,
        compress?: boolean,
        fin?: boolean,
      },
      cb?: (err?: Error) => void,
    ): void;
    terminate(): void;

    // HTML5 WebSocket events
    addEventListener(
      method: 'message',
      cb?: (event: { data: any, type: string, target: WebSocket }) => void,
    ): void;
    addEventListener(
      method: 'close',
      cb?: (event: {
        wasClean: boolean,
        code: number,
        reason: string,
        target: WebSocket,
      }) => void,
    ): void;
    addEventListener(
      method: 'error',
      cb?: (event: {
        error: any,
        message: any,
        type: string,
        target: WebSocket,
      }) => void,
    ): void;
    addEventListener(
      method: 'open',
      cb?: (event: { target: WebSocket }) => void,
    ): void;
    addEventListener(method: string, listener?: () => void): void;

    removeEventListener(
      method: 'message',
      cb?: (event: { data: any, type: string, target: WebSocket }) => void,
    ): void;
    removeEventListener(
      method: 'close',
      cb?: (event: {
        wasClean: boolean,
        code: number,
        reason: string,
        target: WebSocket,
      }) => void,
    ): void;
    removeEventListener(
      method: 'error',
      cb?: (event: {
        error: any,
        message: any,
        type: string,
        target: WebSocket,
      }) => void,
    ): void;
    removeEventListener(
      method: 'open',
      cb?: (event: { target: WebSocket }) => void,
    ): void;
    removeEventListener(method: string, listener?: () => void): void;

    // Events
    on(
      event: 'close',
      listener: (ws: WebSocket, code: number, reason: string) => void,
    ): this;
    on(event: 'error', listener: (ws: WebSocket, err: Error) => void): this;
    on(
      event: 'upgrade',
      listener: (ws: WebSocket, request: http$IncomingMessage<>) => void,
    ): this;
    on(event: 'message', listener: (data: Data) => void): this;
    on(event: 'open', listener: (ws: WebSocket) => void): this;
    on(
      event: 'ping' | 'pong',
      listener: (ws: WebSocket, data: Buffer) => void,
    ): this;
    on(
      event: 'unexpected-response',
      listener: (
        ws: WebSocket,
        request: http$ClientRequest<>,
        response: http$IncomingMessage<>,
      ) => void,
    ): this;
    // on(
    //   event: string | Symbol,
    //   listener: (ws: WebSocket, ...args: any[]) => void,
    // ): this;

    addListener(
      event: 'close',
      listener: (code: number, message: string) => void,
    ): this;
    addListener(event: 'error', listener: (err: Error) => void): this;
    addListener(
      event: 'upgrade',
      listener: (request: http$IncomingMessage<>) => void,
    ): this;
    addListener(event: 'message', listener: (data: Data) => void): this;
    addListener(event: 'open', listener: () => void): this;
    addListener(event: 'ping' | 'pong', listener: (data: Buffer) => void): this;
    addListener(
      event: 'unexpected-response',
      listener: (
        request: http$ClientRequest<>,
        response: http$IncomingMessage<>,
      ) => void,
    ): this;
    addListener(
      event: string | Symbol,
      listener: (...args: any[]) => void,
    ): this;

    removeListener(
      event: 'close',
      listener: (code: number, message: string) => void,
    ): this;
    removeListener(event: 'error', listener: (err: Error) => void): this;
    removeListener(
      event: 'upgrade',
      listener: (request: http$IncomingMessage<>) => void,
    ): this;
    removeListener(event: 'message', listener: (data: Data) => void): this;
    removeListener(event: 'open', listener: () => void): this;
    removeListener(
      event: 'ping' | 'pong',
      listener: (data: Buffer) => void,
    ): this;
    removeListener(
      event: 'unexpected-response',
      listener: (
        request: http$ClientRequest<>,
        response: http$IncomingMessage<>,
      ) => void,
    ): this;
    removeListener(
      event: string | Symbol,
      listener: (...args: any[]) => void,
    ): this;
  }

  // WebSocket Server
  declare class Server {
    options: ServerOptions;
    path: string;
    clients: Set<WebSocket>;

    constructor(options?: ServerOptions, callback?: () => void): this;

    address(void): AddressInfo | string;
    close(cb?: (err?: Error) => void): void;
    handleUpgrade(
      request: http$IncomingMessage<>,
      socket: net$Socket,
      upgradeHead: Buffer,
      callback: (client: WebSocket) => void,
    ): void;
    shouldHandle(request: http$IncomingMessage<>): boolean;

    // Events
    on(
      event: 'connection',
      cb: (
        ws: WebSocket,
        socket: WebSocket,
        request: http$IncomingMessage<>,
      ) => void,
    ): this;
    on(event: 'error', cb: (error: Error) => void): this;
    on(
      event: 'headers',
      cb: (
        ws: WebSocket,
        headers: string[],
        request: http$IncomingMessage<>,
      ) => void,
    ): this;
    on(event: 'listening', cb: (ws: WebSocket) => void): this;
    // on(
    //   event: string | Symbol,
    //   listener: (ws: WebSocket, ...args: any[]) => void,
    // ): this;

    addListener(event: 'connection', cb: (client: WebSocket) => void): this;
    addListener(event: 'error', cb: (err: Error) => void): this;
    addListener(
      event: 'headers',
      cb: (headers: string[], request: http$IncomingMessage<>) => void,
    ): this;
    addListener(event: 'listening', cb: () => void): this;
    addListener(
      event: string | Symbol,
      listener: (...args: any[]) => void,
    ): this;
  }

  declare module.exports: {
    Server: typeof Server,
    WebSocket: typeof WebSocket,
  };
}
