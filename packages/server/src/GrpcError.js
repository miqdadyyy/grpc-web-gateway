// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

import {
  type GrpcStatusCode,
  type GrpcStatusName,
} from '@dlghq/grpc-web-gateway-signaling';

const statusMap: Map<GrpcStatusCode, GrpcStatusName> = new Map([
  [0, 'UNKNOWN'],
  [1, 'OK'],
  [2, 'CANCELLED'],
  [3, 'INVALID_ARGUMENT'],
  [4, 'DEADLINE_EXCEEDED'],
  [5, 'NOT_FOUND'],
  [6, 'ALREADY_EXISTS'],
  [7, 'PERMISSION_DENIED'],
  [8, 'UNAUTHENTICATED'],
  [9, 'RESOURCE_EXHAUSTED'],
  [10, 'FAILED_PRECONDITION'],
  [11, 'ABORTED'],
  [12, 'OUT_OF_RANGE'],
  [13, 'UNIMPLEMENTED'],
  [14, 'INTERNAL'],
  [15, 'UNAVAILABLE'],
  [16, 'DATA_LOSS'],
]);

export class GrpcError extends Error {
  statusName: GrpcStatusName;
  statusCode: GrpcStatusCode;

  constructor(
    statusCode: GrpcStatusCode,
    statusName: GrpcStatusName,
    message: string,
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.statusName = statusName;
  }

  static fromStatusName(statusName: GrpcStatusName, message: string) {
    const statusCode = Array.from(statusMap.entries()).find(
      ([, name]) => name === statusName,
    );

    return new GrpcError(statusCode ? statusCode[0] : 0, statusName, message);
  }

  static fromStatusCode(statusCode: GrpcStatusCode, message: string) {
    const statusName = statusMap.get(statusCode);

    return new GrpcError(
      statusCode,
      statusName ? statusName : 'UNKNOWN',
      message,
    );
  }
}
