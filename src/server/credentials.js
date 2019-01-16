/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

const { credentials } = require('grpc');

export type SslCredentialsConfig = {
  rootCerts: Buffer,
  privateKey: Buffer,
  certChain: Buffer,
};

export type CredentialsConfig =
  | {
      type: 'ssl',
      config: SslCredentialsConfig,
    }
  | {
      type: 'insecure',
    };

export function createCredentials(
  config: CredentialsConfig = { type: 'insecure' },
) {
  switch (config.type) {
    case 'ssl':
      return credentials.createSsl(config.config);

    default:
      return credentials.createInsecure();
  }
}
