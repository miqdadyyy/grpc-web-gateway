const _ = require('lodash');
const { Metadata } = require('grpc');

function parseTicket(req) {
  const auth = req.header('authorization');
  if (auth) {
    return auth;
  }

  const ws = req.header('Sec-WebSocket-Protocol');
  if (ws) {
    return Buffer.from(ws, 'base64').toString('utf-8');
  }

  return null;
}

function createMetadataMapper(filter) {
  return (req) => {
    const metadata = new Metadata();

    if (filter) {
      _.forOwn(req.headers, (value, key) => {
        if (filter(key, value)) {
          metadata.set(key, value);
        }
      });
    }

    const ticket = parseTicket(req);
    if (ticket) {
      metadata.set('x-auth-ticket', ticket);
    }

    return metadata;
  };
}

module.exports = createMetadataMapper;
