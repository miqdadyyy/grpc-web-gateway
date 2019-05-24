// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

import { Observable } from 'rxjs';
import {
  RpcClient,
  RpcError,
  type RpcCall,
  type ClientStreamCall,
  type UnaryRequest,
  type StreamRequest,
  type PushRequest,
  type IRpcClient,
} from '@dlghq/grpc-web-gateway-client';

export type RxUnaryCall = {
  execute(): Observable<Uint8Array>,
  cancel(reason?: string): void,
};

export type RxClientStreamCall = RxUnaryCall & {
  send(PushRequest): void,
  end(): void,
};

const observableFromUnaryCall = (makeCall: () => RpcCall): RxUnaryCall => {
  let call = null;

  return {
    execute: () => {
      return Observable.create(observer => {
        call = call ? call : makeCall();

        call.onMessage(message => observer.next(message));

        call.onError(error => observer.error(error));

        call.onEnd(() => observer.complete());
        
        return () => call.cancel()
      });
    },
    cancel: reason => (call ? call.cancel(reason) : undefined),
  };
};

const observableFromClientStreamCall = (
  makeCall: () => ClientStreamCall,
): RxClientStreamCall => {
  let call = null;

  return {
    execute: () => {
      return Observable.create(observer => {
        call = call ? call : makeCall();
        call.onMessage(message => observer.next(message));

        call.onError(error => observer.error(error));

        call.onEnd(() => observer.complete());
        
        return () => call.cancel()
      });
    },
    send: request => (call ? call.send(request) : undefined),
    end: () => (call ? call.end() : undefined),
    cancel: reason => (call ? call.cancel(reason) : undefined),
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

  onError(handler: RpcError => void) {
    return this.rpcClient.onError(handler);
  }
}
