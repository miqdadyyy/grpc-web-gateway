import { SocketCalls } from './socketCalls';
import {
  createEndResponse,
  createErrorResponse,
  createErrorResponseBody,
  createErrorResponseFromGrpcError,
  createPushResponse,
  createUnaryResponse,
  deserializeMessage,
  parseRequestMessage,
  serializeMessage,
  SERVICE_PONG_RESPONSE,
} from './grpcUtils';
import {
  Call,
  Client,
  ClientWritableStream,
  Metadata,
  ServiceError,
} from '@dlghq/grpc-js';
import { ResponseType } from '@dlghq/grpc-web-gateway-signaling';
import { createMetadata } from './grpcMetadata';
import { GrpcError } from './GrpcError';
import { Logger } from 'pino';

export type GrpcSocketProxy = (message: Buffer | unknown) => void;
export type SocketSendMessage = (data: Uint8Array) => void;

export function createGrpcSocketProxy<Socket extends object>(params: {
  logger: Logger;
  grpcClient: Client;
  initialMetadata: Metadata;
  socketCalls: SocketCalls<Socket>;
  socket: Socket;
  socketSend: SocketSendMessage;
}): GrpcSocketProxy {
  const {
    logger,
    grpcClient,
    initialMetadata,
    socketCalls,
    socket,
    socketSend,
  } = params;

  const sendErrorToSocket = (
    requestId: string,
    error: Error | ServiceError,
  ) => {
    const payload = createErrorResponseBody(error);

    logger.info(
      `Sending error for request "${requestId}": ${payload.status}, ${payload.message}`,
    );

    socketSend(createErrorResponse(requestId, payload));
  };

  const handleServerStreamResponse = (requestId: string, call: Call) => {
    logger.debug('Handler server stream', requestId);

    call.on('data', (response: Uint8Array) => {
      logger.debug('Push data to stream', requestId);
      socketSend(createPushResponse(requestId, response));
    });

    call.on('end', () => {
      logger.debug('Stream was ended', requestId);
      socketSend(createEndResponse(requestId));
      socketCalls.removeCall(socket, requestId);
    });

    call.on('close', () => {
      logger.debug('Closing stream', requestId);
      socketSend(createEndResponse(requestId));
      socketCalls.removeCall(socket, requestId);
    });

    call.on('error', (error) => {
      sendErrorToSocket(requestId, error);
      socketCalls.removeCall(socket, requestId);
    });
  };

  return (message) => {
    let request;
    try {
      request = parseRequestMessage(message);
    } catch (error) {
      logger.error('Failed to parse a request', error);
      return;
    }

    if (!request) {
      return;
    }

    const requestId = request.id;
    if (!requestId) {
      logger.error('Missed ID of a request');
      return;
    }

    if (request.unary && request.unary.payload) {
      const {
        service,
        method,
        payload,
        metadata,
        responseType,
      } = request.unary;
      const path = `/${service}/${method}`;

      if (responseType === ResponseType.STREAM) {
        const call = grpcClient.makeServerStreamRequest(
          path,
          serializeMessage,
          deserializeMessage,
          payload,
          createMetadata(initialMetadata, metadata || {}),
        );

        socketCalls.setCall(socket, requestId, call);
        handleServerStreamResponse(requestId, call);
      } else {
        const call = grpcClient.makeUnaryRequest(
          path,
          serializeMessage,
          deserializeMessage,
          payload,
          createMetadata(initialMetadata, metadata || {}),
          {},
          (error, response) => {
            socketCalls.removeCall(socket, requestId);

            if (error) {
              sendErrorToSocket(requestId, error);
            } else if (response) {
              logger.debug('Send response for unary request', requestId);
              socketSend(createUnaryResponse(requestId, response));
            }
          },
        );

        socketCalls.setCall(socket, requestId, call);
      }
    }

    if (request.stream) {
      const { service, method, metadata, responseType } = request.stream;
      const path = `/${service}/${method}`;

      if (responseType === ResponseType.STREAM) {
        const call = grpcClient.makeBidiStreamRequest(
          path,
          serializeMessage,
          deserializeMessage,
          createMetadata(initialMetadata, metadata || {}),
          {},
        );

        socketCalls.setCall(socket, requestId, call);
        handleServerStreamResponse(requestId, call);
      } else {
        const call = grpcClient.makeClientStreamRequest(
          path,
          serializeMessage,
          deserializeMessage,
          createMetadata(initialMetadata, metadata || {}),
          {},
          (error, response) => {
            socketCalls.removeCall(socket, requestId);

            if (error) {
              sendErrorToSocket(requestId, error);
            } else if (response) {
              logger.debug(
                'Send unary response for a client stream',
                requestId,
              );
              socketSend(createUnaryResponse(requestId, response));
            }
          },
        );

        socketCalls.setCall(socket, requestId, call);

        call.on('error', (error) => {
          socketCalls.removeCall(socket, requestId);
          sendErrorToSocket(requestId, error);
        });
      }
    }

    if (request.push && request.push.payload) {
      const { payload } = request.push;

      const call = socketCalls.getCall<ClientWritableStream<Uint8Array>>(
        socket,
        requestId,
      );
      if (call) {
        logger.debug('Push request', requestId);
        call.write(payload);
      } else {
        const error = GrpcError.fromStatusName(
          'NOT_FOUND',
          `There is no a call with id ${requestId}.`,
        );

        // It is not error because a client could switch a transport.
        logger.warn(error);

        socketSend(createErrorResponseFromGrpcError(requestId, error));
      }
    }

    if (request.end) {
      const call = socketCalls.getCall<ClientWritableStream<Uint8Array>>(
        socket,
        requestId,
      );
      if (call) {
        logger.debug('End request', requestId);
        socketCalls.removeCall(socket, requestId);
        call.end();
      }
    }

    if (request.cancel) {
      const { reason } = request.cancel;
      const call = socketCalls.getCall(socket, requestId);
      if (call) {
        logger.debug('Cancel request', requestId, { reason });
        socketCalls.removeCall(socket, requestId);
        call.cancel();
      }
    }

    if (request.service && request.service.ping) {
      socketSend(SERVICE_PONG_RESPONSE);
    }
  };
}
