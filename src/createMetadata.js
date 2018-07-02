const { Metadata } = require('grpc');

function createMetadata(req) {
  const metadata = new Metadata();
  const auth = req.header('authorization');
  if (auth) {
    if (auth.startsWith('Bearer')) {
      metadata.set('x-auth-ticket', auth.slice(7));
    } else if (auth.startsWith('Basic')) {
      metadata.set('x-auth-ticket', Buffer.from(auth.slice(6), 'base64').toString('utf-8'));
    }
  }

  return metadata;
}

module.exports = createMetadata;
