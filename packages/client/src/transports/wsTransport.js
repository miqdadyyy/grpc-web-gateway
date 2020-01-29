// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

import Nanoevents from 'nanoevents';
import unbindAll from 'nanoevents/unbind-all';

import { type StatusfulTransport } from '../transport';
import { RpcError } from '../RpcError';

type MessageHandler = (message: Uint8Array) => void;
type ErrorHandler = (error: RpcError) => void;

export const createWebsocketTransport = (
  endpoint: string,
): StatusfulTransport => {
  let queue = [];
  const socket = new WebSocket(endpoint);

  socket.binaryType = 'arraybuffer';

  const emitter: Nanoevents<{
    open: void,
    message: Uint8Array,
    error: RpcError,
    close: void,
    ...
  }> = new Nanoevents();

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

  const handleOpen = () => {
    emitter.emit('open');
    if (queue.length) {
      queue.forEach(send);
      queue = [];
    }
  };
  socket.onopen = handleOpen;

  socket.onclose = () => {
    emitter.emit('close');
  };

  emitter.on('close', () => {
    unbindAll(emitter);
  });

  socket.onmessage = event => {
    if (event.data instanceof ArrayBuffer) {
      const message = new Uint8Array(
        // Flow hack to refine event.data type
        (event.data: ArrayBuffer),
      );
      emitter.emit(
        'message',
        new Uint8Array(
          // Flow hack to refine event.data type
          message,
        ),
      );
    } else {
      emitter.emit(
        'error',
        new RpcError(
          'SERIALIZATION_MISMATCH',
          'Incoming message should be ArrayBuffer',
        ),
      );
    }
  };

  const onOpen = (handler: () => void) => {
    return emitter.on('open', handler);
  };

  const onMessage = (handler: MessageHandler) => {
    return emitter.on('message', handler);
  };

  const onError = (handler: ErrorHandler) => {
    return emitter.on('error', handler);
  };

  const onClose = (handler: void => void) => {
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

export const createWebsocketTransportFactory = (
  endpoint: string,
) => (): StatusfulTransport => createWebsocketTransport(endpoint);
