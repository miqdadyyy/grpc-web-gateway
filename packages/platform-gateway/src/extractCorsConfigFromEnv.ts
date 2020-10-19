/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

export const CORS_HTTP_METHODS = 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE';

export function extractCorsConfigFromEnv(): {
  origin: boolean | Array<string>;
  methods: string;
} {
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
