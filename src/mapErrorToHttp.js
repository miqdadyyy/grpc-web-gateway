const { status } = require('grpc');

function mapGrpcStatusToHttp(code) {
  switch (code) {
    case status.OK:
      return { status: 200, code: 'OK' };
    case status.CANCELLED:
      return { status: 499, code: 'CANCELLED' };
    case status.INVALID_ARGUMENT:
      return { status: 400, code: 'INVALID_ARGUMENT' };
    case status.DEADLINE_EXCEEDED:
      return { status: 504, code: 'DEADLINE_EXCEEDED' };
    case status.NOT_FOUND:
      return { status: 404, code: 'NOT_FOUND' };
    case status.ALREADY_EXISTS:
      return { status: 409, code: 'ALREADY_EXISTS' };
    case status.PERMISSION_DENIED:
      return { status: 403, code: 'PERMISSION_DENIED' };
    case status.UNAUTHENTICATED:
      return { status: 401, code: 'UNAUTHENTICATED' };
    case status.RESOURCE_EXHAUSTED:
      return { status: 429, code: 'RESOURCE_EXHAUSTED' };
    case status.FAILED_PRECONDITION:
      return { status: 400, code: 'FAILED_PRECONDITION' };
    case status.ABORTED:
      return { status: 409, code: 'ABORTED' };
    case status.OUT_OF_RANGE:
      return { status: 400, code: 'OUT_OF_RANGE' };
    case status.UNIMPLEMENTED:
      return { status: 501, code: 'UNIMPLEMENTED' };
    case status.INTERNAL:
      return { status: 500, code: 'INTERNAL' };
    case status.UNAVAILABLE:
      return { status: 503, code: 'UNAVAILABLE' };
    case status.DATA_LOSS:
      return { status: 500, code: 'DATA_LOSS' };
    default:
      return { status: 500, code: 'UNKNOWN' };
  }
}

function mapErrorToHttp(error) {
  const mapped = mapGrpcStatusToHttp(error.code);
  mapped.message = error.details;
  return mapped;
}

module.exports = mapErrorToHttp;
