// Copyright 2018 dialog LLC <info@dlg.im>

import { Emitter } from 'nanoevents';

import { StatusfulTransport } from '../transport';
import { RpcError } from '../RpcError';
import { unbindAll } from '../utils/emitterUtils';

type MessageHandler = (message: Uint8Array) => void;
type ErrorHandler = (error: RpcError) => void;

export const createWebsocketTransport = (
  endpoint: string,
): StatusfulTransport => {
  let queue: Array<Uint8Array> = [];
  const socket = new WebSocket(endpoint);

  socket.binaryType = 'arraybuffer';

  const emitter: Emitter<{
    open: () => void;
    message: (data: Uint8Array) => void;
    error: (error: RpcError) => void;
    close: () => void;
  }> = new Emitter();

  const send = (message: Uint8Array): void => {
    switch (socket.readyState) {
      case WebSocket.CONNECTING:
        queue.push(message);
        break;

      case WebSocket.OPEN:
        socket.send(message);
        break;

      default:
        throw new Error('Connection closed');
    }
  };

  socket.addEventListener('open', () => {
    emitter.emit('open');
    if (queue.length) {
      queue.forEach(send);
      queue = [];
    }
  });

  socket.addEventListener('close', () => {
    emitter.emit('close');
  });

  emitter.on('close', () => {
    unbindAll(emitter);
  });

  socket.addEventListener('message', (event) => {
    if (event.data instanceof ArrayBuffer) {
      const message = new Uint8Array(event.data);
      emitter.emit('message', message);
    } else {
      emitter.emit(
        'error',
        new RpcError(
          'SERIALIZATION_MISMATCH',
          'Incoming message should be ArrayBuffer',
        ),
      );
    }
  });

  const onOpen = (handler: () => void) => {
    return emitter.on('open', handler);
  };

  const onMessage = (handler: MessageHandler) => {
    return emitter.on('message', handler);
  };

  const onError = (handler: ErrorHandler) => {
    return emitter.on('error', handler);
  };

  const onClose = (handler: () => void) => {
    return emitter.on('close', handler);
  };

  const close = () => {
    emitter.emit('close');
    socket.close();
  };

  return {
    onOpen,
    onMessage,
    onError,
    onClose,
    send,
    close,
  };
};
