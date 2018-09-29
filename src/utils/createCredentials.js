const { credentials } = require('grpc');

function parseBuffer(value) {
  return Buffer.isBuffer(value) ? value : undefined;
}

function createCredentials(config) {
  if (config) {
    return credentials.createSsl(
      parseBuffer(config.rootCerts),
      parseBuffer(config.privateKey),
      parseBuffer(config.certChain)
    );
  }

  return credentials.createInsecure();
}

module.exports = createCredentials;
