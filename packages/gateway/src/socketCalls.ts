import { Call } from '@grpc/grpc-js';

export class SocketCalls<Socket extends object> {
  _socketCalls: WeakMap<Socket, Map<string, Call>> = new WeakMap();

  getCall<T extends Call>(socket: Socket, requestId: string): T | void {
    const calls = this._socketCalls.get(socket);
    return calls ? (calls.get(requestId) as T) : undefined;
  }

  setCall(socket: Socket, requestId: string, call: Call): void {
    let calls = this._socketCalls.get(socket);
    if (!calls) {
      calls = new Map();
      this._socketCalls.set(socket, calls);
    }
    calls.set(requestId, call);
  }

  removeCall(socket: Socket, requestId: string): void {
    const calls = this._socketCalls.get(socket);
    if (calls) {
      calls.delete(requestId);
    }
  }

  cancelSocketCalls(socket: Socket): void {
    const calls = this._socketCalls.get(socket);
    this._socketCalls.delete(socket);

    if (calls) {
      calls.forEach((call) => call.cancel());
    }
  }
}
