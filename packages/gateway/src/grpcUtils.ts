import {
  IErrorResponseBody,
  IRequest,
  Request,
  Response,
} from '@dlghq/grpc-web-gateway-signaling';
import { GrpcError } from './GrpcError';

export function serializeMessage(value: Uint8Array): Buffer {
  return Buffer.from(value);
}

export function deserializeMessage(data: Buffer): Uint8Array {
  return data;
}

export const SERVICE_PONG_RESPONSE = createServicePongResponse();

export function parseRequestMessage(
  message: Buffer | unknown,
): IRequest | void {
  if (!(message instanceof Buffer)) {
    throw new Error('Message should be ArrayBuffer');
  }

  const data = new Uint8Array(message);
  let request;
  try {
    request = Request.decode(data);
  } catch (error) {
    const isEmptyPacketFromClientTransport =
      data.length === 2 && data[0] === 1 && data[1] === 0;
    if (isEmptyPacketFromClientTransport) {
      return undefined;
    }
    throw error;
  }

  return Request.toObject(request);
}

export function createServicePongResponse(): Uint8Array {
  return Request.encode({
    id: 'service',
    service: { pong: {} },
  }).finish();
}

export function createErrorResponse(
  requestId: string,
  error: IErrorResponseBody,
): Uint8Array {
  return Response.encode({ id: requestId, error }).finish();
}

export function createErrorResponseFromGrpcError(
  requestId: string,
  error: GrpcError,
): Uint8Array {
  return Response.encode({
    id: requestId,
    error: {
      status: error.statusCode,
      message: error.message,
    },
  }).finish();
}

export function createUnaryResponse(
  requestId: string,
  payload: Uint8Array,
): Uint8Array {
  return Response.encode({ id: requestId, unary: { payload } }).finish();
}

export function createPushResponse(
  requestId: string,
  payload: Uint8Array,
): Uint8Array {
  return Response.encode({ id: requestId, push: { payload } }).finish();
}

export function createEndResponse(requestId: string): Uint8Array {
  return Response.encode({ id: requestId, end: {} }).finish();
}
