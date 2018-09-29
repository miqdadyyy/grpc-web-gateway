const _ = require('lodash');
const { Metadata } = require('grpc');

function parseTicket(req) {
  const auth = req.header('authorization');
  if (auth) {
    return auth;
  }

  if (req.query && req.query.token) {
    return req.query.token;
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
