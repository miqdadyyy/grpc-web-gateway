// Copyright 2018 dialog LLC <info@dlg.im>

import { Observable, Subscriber } from 'rxjs';
import { share } from 'rxjs/operators';
import {
  ClientStreamCall,
  IRpcClient,
  PushRequest,
  RpcCall,
  RpcClient,
  RpcError,
  StreamRequest,
  UnaryRequest,
} from '@dlghq/grpc-web-gateway-client';

export type RxUnaryCall = {
  execute(): Observable<Uint8Array>;
  cancel(reason?: string): void;
};

export type RxClientStreamCall = RxUnaryCall & {
  send(request: PushRequest): void;
  end(): void;
};

function cancelCall(call: RpcCall | void, reason?: string): void {
  if (call) {
    call.cancel(reason);
  }
}

const observableFromUnaryCall = (makeCall: () => RpcCall): RxUnaryCall => {
  let call: RpcCall | void;

  return {
    execute: () => {
      return Observable.create((observer: Subscriber<Uint8Array>) => {
        call = makeCall();

        call.onMessage((message) => observer.next(message));

        call.onError((error) => observer.error(error));

        call.onEnd(() => observer.complete());

        call.onCancel(() => observer.complete());

        return () => cancelCall(call);
      }).pipe(share());
    },
    cancel: (reason) => cancelCall(call, reason),
  };
};

const observableFromClientStreamCall = (
  makeCall: () => ClientStreamCall,
): RxClientStreamCall => {
  let call: ClientStreamCall | void;

  return {
    execute: () => {
      return Observable.create((observer: Subscriber<Uint8Array>) => {
        call = makeCall();

        call.onMessage((message) => observer.next(message));

        call.onError((error) => observer.error(error));

        call.onEnd(() => observer.complete());

        call.onCancel(() => observer.complete());

        return () => cancelCall(call);
      }).pipe(share());
    },
    send: (request) => (call ? call.send(request) : undefined),
    end: () => (call ? call.end() : undefined),
    cancel: (reason) => cancelCall(call, reason),
  };
};

export class RxRpcClient
  implements IRpcClient<RxUnaryCall, RxClientStreamCall> {
  rpcClient: RpcClient;

  constructor(rpcClient: RpcClient) {
    this.rpcClient = rpcClient;
  }

  makeUnaryRequest(request: UnaryRequest): RxUnaryCall {
    return observableFromUnaryCall(() =>
      this.rpcClient.makeUnaryRequest(request),
    );
  }

  makeServerStreamRequest(request: UnaryRequest): RxUnaryCall {
    return observableFromUnaryCall(() =>
      this.rpcClient.makeServerStreamRequest(request),
    );
  }

  makeClientStreamRequest(request: StreamRequest): RxClientStreamCall {
    return observableFromClientStreamCall(() =>
      this.rpcClient.makeClientStreamRequest(request),
    );
  }

  makeBidiStreamRequest(request: StreamRequest): RxClientStreamCall {
    return observableFromClientStreamCall(() =>
      this.rpcClient.makeBidiStreamRequest(request),
    );
  }

  onError(handler: (error: RpcError) => void): () => void {
    return this.rpcClient.onError(handler);
  }
}
