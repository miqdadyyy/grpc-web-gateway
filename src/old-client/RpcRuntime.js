/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import Kefir from 'kefir';
import RpcError from './RpcError';

type Config = {
  endpoints: string[]
};

type Request = {
  service: string,
  method: string,
  payload?: mixed,
  token?: string,
  timeout?: number
};

class RpcRuntime {
  endpoints: string[];

  constructor(config: Config) {
    this.endpoints = config.endpoints;
  }

  getEndpoint() {
    // TODO: healthcheck, change
    return this.endpoints[0];
  }

  createRequest({ service, method, token, timeout }: { service: string, method: string, token?: string, timeout?: number }) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${this.getEndpoint()}/${service}/${method}`, true);
    xhr.setRequestHeader('accept', 'application/grpc-web');
    xhr.setRequestHeader('content-type', 'application/grpc-web');
    if (token) {
      xhr.setRequestHeader('authorization', `Bearer ${token}`);
    }

    if (timeout) {
      xhr.timeout = timeout;
    }

    return xhr;
  }

  makeBidiStreamRequest({ service, method, payload, token }) {

  }

  makeClientStreamRequest({ service, method, payload, token }) {

  }

  makeServerStreamRequest({ service, method, payload, token }: Request) {
    return Kefir.stream(emitter => {
      const xhr = this.createRequest({ service, method, token });

      let seenBytes = 0;
      xhr.onreadystatechange = (event) => {
        switch (xhr.readyState) {
          case 3:
            if (xhr.status === 200) {
              const chunk = xhr.response
                .slice(seenBytes)
                .trimRight()
                .split('\n');
              seenBytes = xhr.responseText.length;

              chunk.forEach((json) => {
                emitter.emit(JSON.parse(json));
              });
            } else {
              throw new Error(xhr.responseText);
            }
            break;

          case 4:
            emitter.end();
            break;

          default:
            // do nothing
        }
      };

      xhr.onerror = () => {
        emitter.error(new RpcError('unexpected', 'Network request failed'));
        emitter.end();
      };

      xhr.send(encodeJson(payload));

      return () => {
        xhr.abort();
      };
    });
  }

  makeUnaryRequest({ service, method, payload, token }: Request) {
    return Kefir.stream((emitter) => {
      const xhr = this.createRequest({ service, method, token });
      xhr.responseType = 'blob';

      xhr.onreadystatechange = (event) => {
        if (xhr.readyState === 4) {
          if (xhr.status < 200 || xhr.status >= 300) {
            emitter.error(new RpcError(`http_${xhr.status}`, xhr.statusText));
            emitter.end();
          } else {
            const reader = new FileReader();

            reader.onload = () => {
              emitter.value(new Uint8Array(reader.result));
              emitter.end();
            };
            reader.onerror = () => {
              emitter.error(new RpcError('unexpected_response', `Response could not be parsed: ${reader.error.message}`));
              emitter.end();
            };

            reader.readAsArrayBuffer(xhr.response);
          }
        }
      };

      xhr.onerror = () => {
        emitter.error(new RpcError('unexpected', 'Network request failed'));
        emitter.end();
      };

      xhr.ontimeout = () => {
        emitter.error(new RpcError('timeout', 'Request timeout'));
        emitter.end();
      };

      xhr.send(payload);

      return () => {
        xhr.abort();
      };
    });
  }
}

export default RpcRuntime;
