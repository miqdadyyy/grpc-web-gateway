/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import Kefir, {
  constant,
  stream,
  type Observable,
  type Emitter,
  type Property,
} from 'kefir';
import Nanoevents from 'nanoevents';
import unbindAll from 'nanoevents/unbind-all';

import { type RpcDuplexTransport, type Transport } from './transport';
import { RpcError } from './RpcError';
import { Request, type Response } from '../shared/signaling';

// const createWebSocketTransport = endpoint => {
//   let queue = [];
//   const socket = new WebSocket(endpoint);

//   const send = (message: Uint8Array): void => {
//     switch (socket.readyState) {
//       case WebSocket.CONNECTING:
//         queue.push(message);
//         break;

//       case WebSocket.OPEN:
//         socket.send(message);
//         break;

//       default:
//         throw new Error('Connection closed');
//     }
//   };

//   const handleSocketOpen = () => {
//     if (queue.length) {
//       queue.forEach(message => send(message));
//       queue = [];
//     }
//   };

//   socket.binaryType = 'arraybuffer';
//   socket.onopen = handleSocketOpen;

//   return {
//     send: (message: Uint8Array): void => {
//       switch (socket.readyState) {
//         case WebSocket.CONNECTING:
//           queue.push(message);
//           break;

//         case WebSocket.OPEN:
//           socket.send(message);
//           break;

//         default:
//           throw new Error('Connection closed');
//       }
//     },
//     stream: Kefir.stream(emitter => {
//       socket.onclose = () => emitter.end();
//       socket.onerror = event => {
//         console.error(event);
//         emitter.error(new RpcError('UNKNOWN', 'WebSocket error'));
//       };
//       socket.onmessage = event => {
//         if (event.data instanceof ArrayBuffer) {
//           const data = event.data;
//           emitter.value(new Uint8Array(event.data));
//         } else {
//           emitter.error(
//             new RpcError(
//               'SERIALIZATION_MISMATCH',
//               'Incoming message should be ArrayBuffer',
//             ),
//           );
//         }
//       };

//       return () => socket.close();
//     }),
//   };
// };

// class TestTransport implements Transport {
//   queue: Array<Uint8Array>;
//   socket: WebSocket;
//   listeners: Array<(message: Uint8Array) => void>;
//   errorListeners: Array<(error: RpcError) => void>;

//   constructor(endpoint: string) {
//     this.queue = [];
//     this.listeners = [];

//     const socket = new WebSocket(endpoint);
//     socket.binaryType = 'arraybuffer';
//     socket.onopen = () => this.handleOpen();

//     this.socket = socket;
//   }

//   handleOpen() {
//     if (this.queue.length) {
//       this.queue.forEach(message => this.send(message));
//       this.queue = [];
//     }
//   }

//   start() {
//     this.socket.onclose = () => this.off();

//     this.socket.onerror = event => {
//       console.error(event);
//       emitter.error(new RpcError('UNKNOWN', 'WebSocket error'));
//     };
//     this.socket.onmessage = event => {
//       if (event.data instanceof ArrayBuffer) {
//         emitter.value(new Uint8Array(event.data));
//       } else {
//         emitter.error(
//           new RpcError(
//             'SERIALIZATION_MISMATCH',
//             'Incoming message should be ArrayBuffer',
//           ),
//         );
//       }
//     };

//     return () => this.socket.close();
//   }

//   onMessage(messageHandler: Uint8Array => void) {
//     this.listeners = this.listeners.concat(messageHandler);
//   }

//   offError(errorHandler: RpcError => void) {
//     this.errorListeners = this.errorListeners.filter(
//       handler => handler !== errorHandler,
//     );
//   }

//   offMessage(messageHandler: Uint8Array => void) {
//     this.listeners = this.listeners.filter(
//       handler => handler !== messageHandler,
//     );
//   }

//   off() {
//     this.listeners = [];
//     this.errorListeners = [];
//   }

//   send(message: Uint8Array): void {
//     switch (this.socket.readyState) {
//       case WebSocket.CONNECTING:
//         this.queue.push(message);
//         break;

//       case WebSocket.OPEN:
//         this.socket.send(message);
//         break;

//       default:
//         throw new Error('Connection closed');
//     }
//   }
// }

// class WebSocketTransport implements RpcDuplexTransport {
//   queue: Array<Uint8Array>;
//   socket: WebSocket;

//   constructor(endpoint: string) {
//     this.queue = [];

//     const socket = new WebSocket(endpoint);
//     socket.binaryType = 'arraybuffer';
//     socket.onopen = () => this.handleOpen();

//     this.socket = socket;
//   }

//   handleOpen() {
//     if (this.queue.length) {
//       this.queue.forEach(message => this.send(message));
//       this.queue = [];
//     }
//   }

//   read(): Observable<Uint8Array, RpcError> {
//     return Kefir.stream(emitter => {
//       this.socket.onclose = () => emitter.end();
//       this.socket.onerror = event => {
//         console.error(event);
//         emitter.error(new RpcError('UNKNOWN', 'WebSocket error'));
//       };
//       this.socket.onmessage = event => {
//         if (event.data instanceof ArrayBuffer) {
//           emitter.value(new Uint8Array(event.data));
//         } else {
//           emitter.error(
//             new RpcError(
//               'SERIALIZATION_MISMATCH',
//               'Incoming message should be ArrayBuffer',
//             ),
//           );
//         }
//       };

//       return () => this.socket.close();
//     });
//   }

//   send(message: Uint8Array): void {
//     switch (this.socket.readyState) {
//       case WebSocket.CONNECTING:
//         this.queue.push(message);
//         break;

//       case WebSocket.OPEN:
//         this.socket.send(message);
//         break;

//       default:
//         throw new Error('Connection closed');
//     }
//   }
// }

type MessageHandler = (message: Uint8Array) => void;
type ErrorHandler = (error: RpcError) => void;

class WebSocketTransport implements Transport {
  queue: Array<Uint8Array>;
  socket: WebSocket;
  emitter: Nanoevents<{ message: Uint8Array, error: RpcError }>;

  constructor(endpoint: string) {
    this.queue = [];

    const socket = new WebSocket(endpoint);
    socket.binaryType = 'arraybuffer';
    socket.onopen = () => this.handleOpen();

    this.socket = socket;
    this.emitter = new Nanoevents();

    this.socket.onclose = () => unbindAll(this.emitter);
    this.socket.onmessage = event => {
      if (event.data instanceof ArrayBuffer) {
        this.emitter.emit(
          'message',
          new Uint8Array(
            (event.data: ArrayBuffer) /* Flow hack to refine event.data type */,
          ),
        );
      } else {
        this.emitter.emit(
          'error',
          new RpcError(
            'SERIALIZATION_MISMATCH',
            'Incoming message should be ArrayBuffer',
          ),
        );
      }
    };
  }

  handleOpen() {
    if (this.queue.length) {
      this.queue.forEach(message => this.send(message));
      this.queue = [];
    }
  }

  onMessage(handler: MessageHandler) {
    this.emitter.on('message', handler);
    return this;
  }

  onError(handler: ErrorHandler) {
    this.emitter.on('error', handler);
    return this;
  }

  send(message: Uint8Array): void {
    switch (this.socket.readyState) {
      case WebSocket.CONNECTING:
        this.queue.push(message);
        break;

      case WebSocket.OPEN:
        this.socket.send(message);
        break;

      default:
        throw new Error('Connection closed');
    }
  }
}

export default WebSocketTransport;
