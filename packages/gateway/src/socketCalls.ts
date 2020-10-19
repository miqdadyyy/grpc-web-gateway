import { Call } from 'grpc';
import { WebSocket } from './types';

export class SocketCalls {
  _socketCalls: WeakMap<WebSocket, Map<string, Call>> = new WeakMap();

  getCall<T extends Call>(socket: WebSocket, requestId: string): T | void {
    const calls = this._socketCalls.get(socket);
    return calls ? (calls.get(requestId) as T) : undefined;
  }

  setCall(socket: WebSocket, requestId: string, call: Call): void {
    let calls = this._socketCalls.get(socket);
    if (!calls) {
      calls = new Map();
      this._socketCalls.set(socket, calls);
    }
    calls.set(requestId, call);
  }

  removeCall(socket: WebSocket, requestId: string): void {
    const calls = this._socketCalls.get(socket);
    if (calls) {
      calls.delete(requestId);
    }
  }

  cancelSocketCalls(socket: WebSocket): void {
    const calls = this._socketCalls.get(socket);
    this._socketCalls.delete(socket);

    if (calls) {
      calls.forEach((call) => call.cancel());
    }
  }
}
