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

function createMetadata(req) {
  const metadata = new Metadata();
  const ticket = parseTicket(req);
  if (ticket) {
    metadata.set('x-auth-ticket', ticket);
  }

  return metadata;
}

module.exports = createMetadata;
