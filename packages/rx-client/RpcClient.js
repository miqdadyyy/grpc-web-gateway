// @flow strict

// Copyright 2018 dialog LLC <info@dlg.im>

import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import {
  RpcClient,
  RpcError,
  type RpcCall,
  type ClientStreamCall,
  type UnaryRequest,
  type StreamRequest,
  type PushRequest,
  type IRpcClient,
  type UnaryCall,
  type ServerStreamCall,
  type BidiStreamCall,
} from '@dlghq/grpc-web-gateway-client';

export type RxUnaryCall = {
  execute(): Observable<Uint8Array>,
  cancel(reason?: string): void,
};

export type RxClientStreamCall = RxUnaryCall & {
  send(PushRequest): void,
  end(): void,
};

function cancelCall(call, reason) {
  if (call) {
    call.cancel(reason);
  }
}

const observableFromUnaryCall = (
  call: UnaryCall | ServerStreamCall,
  request: UnaryRequest,
) => {
  return {
    execute: () => {
      return Observable.create(observer => {
        let bindings = [
          call.onMessage(message => {
            observer.next(message);
          }),
          call.onError(error => {
            observer.error(error);
          }),
          call.onEnd(() => {
            observer.complete();
          }),
        ];

        call.start(request);

        return () => {
          bindings.forEach(unbind => unbind());
          bindings = [];

          cancelCall(call);
        };
      }).pipe(share());
    },
    cancel: reason => cancelCall(call, reason),
  };
};

const observableFromClientStreamCall = (
  call: ClientStreamCall | BidiStreamCall,
  request: StreamRequest,
): RxClientStreamCall => {
  return {
    execute: () => {
      return Observable.create(observer => {
        let bindings = [
          call.onMessage(message => {
            observer.next(message);
          }),
          call.onError(error => {
            observer.error(error);
          }),
          call.onEnd(() => {
            observer.complete();
          }),
        ];

        call.start(request);

        return () => {
          bindings.forEach(unbind => unbind());
          bindings = [];

          cancelCall(call);
        };
      }).pipe(share());
    },
    send: request => (call ? call.send(request) : undefined),
    end: () => (call ? call.end() : undefined),
    cancel: reason => cancelCall(call, reason),
  };
};

export class RxRpcClient {
  rpcClient: RpcClient;

  constructor(rpcClient: RpcClient) {
    this.rpcClient = rpcClient;
  }

  makeUnaryRequest(request: UnaryRequest): RxUnaryCall {
    return observableFromUnaryCall(this.rpcClient.makeUnaryRequest(), request);
  }

  makeServerStreamRequest(request: UnaryRequest): RxUnaryCall {
    return observableFromUnaryCall(
      this.rpcClient.makeServerStreamRequest(),
      request,
    );
  }

  makeClientStreamRequest(request: StreamRequest): RxClientStreamCall {
    return observableFromClientStreamCall(
      this.rpcClient.makeClientStreamRequest(),
      request,
    );
  }

  makeBidiStreamRequest(request: StreamRequest): RxClientStreamCall {
    return observableFromClientStreamCall(
      this.rpcClient.makeBidiStreamRequest(),
      request,
    );
  }
}
