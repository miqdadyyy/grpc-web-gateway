/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

class WebSocketTransport {
  ws: WebSocket;
  queue: ArrayBuffer[];

  constructor(endpoint: string) {
    const ws = new WebSocket(endpoint);
    ws.onopen = () => this.handleOpen();
    this.ws = new WebSocket(endpoint);
    this.queue = [];
  }

  handleOpen() {
  }

  send(payload: ArrayBuffer): void {
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        this.queue.push(payload);
        break;

      case WebSocket.OPEN:
        this.ws.send(payload);
        break;

      default:
        throw new Error('Connection closed');
    }
  }
}

export default WebSocketConnection;
