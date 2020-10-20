// Copyright 2018 dialog LLC <info@dlg.im>

import { ChannelCredentials, credentials } from '@grpc/grpc-js';

export type SslCredentialsConfig = {
  rootCerts: Buffer;
  privateKey: Buffer;
  certChain: Buffer;
};

export type CredentialsConfig =
  | {
      type: 'ssl';
      config?: SslCredentialsConfig;
    }
  | { type: 'insecure' };

export function createCredentials(
  config: CredentialsConfig = { type: 'insecure' },
): ChannelCredentials {
  switch (config.type) {
    case 'ssl':
      const { rootCerts, privateKey, certChain } = config.config ?? {};
      return credentials.createSsl(rootCerts, privateKey, certChain);

    default:
      return credentials.createInsecure();
  }
}
