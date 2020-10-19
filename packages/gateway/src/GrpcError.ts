// Copyright 2018 dialog LLC <info@dlg.im>

import { Status } from '@dlghq/grpc-web-gateway-signaling';

export type GrpcStatusCode = Status;

export type GrpcStatusName =
  | 'UNKNOWN'
  | 'OK'
  | 'CANCELLED'
  | 'INVALID_ARGUMENT'
  | 'DEADLINE_EXCEEDED'
  | 'NOT_FOUND'
  | 'ALREADY_EXISTS'
  | 'PERMISSION_DENIED'
  | 'UNAUTHENTICATED'
  | 'RESOURCE_EXHAUSTED'
  | 'FAILED_PRECONDITION'
  | 'ABORTED'
  | 'OUT_OF_RANGE'
  | 'UNIMPLEMENTED'
  | 'INTERNAL'
  | 'UNAVAILABLE'
  | 'DATA_LOSS';

const statusNameMap: Map<GrpcStatusCode, GrpcStatusName> = new Map([
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

const statusCodeMap: Map<GrpcStatusName, GrpcStatusCode> = new Map([
  ['UNKNOWN', 0],
  ['OK', 1],
  ['CANCELLED', 2],
  ['INVALID_ARGUMENT', 3],
  ['DEADLINE_EXCEEDED', 4],
  ['NOT_FOUND', 5],
  ['ALREADY_EXISTS', 6],
  ['PERMISSION_DENIED', 7],
  ['UNAUTHENTICATED', 8],
  ['RESOURCE_EXHAUSTED', 9],
  ['FAILED_PRECONDITION', 10],
  ['ABORTED', 11],
  ['OUT_OF_RANGE', 12],
  ['UNIMPLEMENTED', 13],
  ['INTERNAL', 14],
  ['UNAVAILABLE', 15],
  ['DATA_LOSS', 16],
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

  static fromStatusName(
    statusName: GrpcStatusName,
    message: string,
  ): GrpcError {
    const statusCode: number = statusCodeMap.get(statusName) ?? 0;

    return new GrpcError(statusCode, statusName, message);
  }

  static fromStatusCode(
    statusCode: GrpcStatusCode,
    message: string,
  ): GrpcError {
    const statusName = statusNameMap.get(statusCode);

    return new GrpcError(
      statusCode,
      statusName ? statusName : 'UNKNOWN',
      message,
    );
  }
}
