// @flow strict

import { WebSocket } from "ws";
import { GrpcCall } from "grpc";

export class SocketCalls {
  _socketCalls: WeakMap<WebSocket, Map<string, GrpcCall>> = new WeakMap();

  getCall(socket: WebSocket, requestId: string): GrpcCall | void {
    const calls = this._socketCalls.get(socket);
    return calls ? calls.get(requestId) : undefined;
  }

  setCall(socket: WebSocket, requestId: string, call: GrpcCall) {
    let calls = this._socketCalls.get(socket);
    if (!calls) {
      calls = new Map();
      this._socketCalls.set(socket, calls);
    }
    calls.set(requestId, call);
  }

  removeCall(socket: WebSocket, requestId: string) {
    const calls = this._socketCalls.get(socket);
    if (calls) {
      calls.delete(requestId);
    }
  }

  cancelSocketCalls(socket: WebSocket) {
    const calls = this._socketCalls.get(socket);
    this._socketCalls.delete(socket);

    if (calls) {
      calls.forEach(call => call.cancel());
    }
  }
}
