/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import { Observable } from 'rxjs';

import { RpcClient } from '../client';
import type {
  RpcCall,
  ClientStreamCall,
  UnaryRequest,
  StreamRequest,
  PushRequest,
} from '../client/types';

type RxUnaryCall = {
  execute(): Observable<Uint8Array>,
  cancel(): void,
};

type RxClientStreamCall = RxUnaryCall & {
  send(PushRequest): void,
  end(): void,
};

const observableFromUnaryCall = (makeCall: () => RpcCall): RxUnaryCall => {
  let call = null;

  return {
    execute: () => {
      return Observable.create(observer => {
        call = makeCall();

        call.onMessage(message => observer.next(message));

        call.onError(() => observer.error());

        call.onEnd(() => observer.complete());
      });
    },
    cancel: () => (call ? call.cancel() : undefined),
  };
};

const observableFromClientStreamCall = (
  makeCall: () => ClientStreamCall,
): RxClientStreamCall => {
  const call = makeCall();

  return {
    execute: () => {
      return Observable.create(observer => {
        call.onMessage(message => observer.next(message));

        call.onError(() => observer.error());

        call.onEnd(() => observer.complete());
      });
    },
    send: request => call.send(request),
    end: () => call.end(),
    cancel: () => (call ? call.cancel() : undefined),
  };
};

export class RxRpcClient {
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
}
