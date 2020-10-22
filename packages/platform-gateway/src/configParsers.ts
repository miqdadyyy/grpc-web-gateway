/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import { envSchema } from 'env-schema';

export const CORS_HTTP_METHODS = 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE';

export type ServerConfig = {
  host: string;
  port: number;
  apiHost: string;
  apiSecure: boolean;
};

export type CorsConfig = {
  origin: boolean | Array<string>;
  methods: string;
};

export function parseServerConfigFromEnv(): ServerConfig {
  const values = envSchema({
    dotenv: true,
    schema: {
      type: 'object',
      properties: {
        HOST: {
          type: 'string',
          default: '0.0.0.0',
        },
        PORT: {
          type: 'number',
          default: 8080,
        },
        API_HOST: {
          type: 'string',
          default: 'localhost:3000',
        },
        API_SECURE: {
          type: 'boolean',
          default: false,
        },
      },
    },
  });

  return {
    host: values.HOST as string,
    port: values.PORT as number,
    apiHost: values.API_HOST as string,
    apiSecure: values.API_SECURE as boolean,
  };
}

export function parseCorsConfigFromEnv(): CorsConfig {
  return {
    origin: extractOrigin(),
    methods: CORS_HTTP_METHODS,
  };
}

function extractOrigin() {
  const { CORS_ORIGIN: origin } = process.env;
  if (origin) {
    if (origin === 'true') {
      return true;
    }

    if (origin === 'false') {
      return false;
    }

    return origin
      .split(',')
      .map((endpoint) => endpoint.trim())
      .filter(Boolean);
  }

  // default
  return true;
}
