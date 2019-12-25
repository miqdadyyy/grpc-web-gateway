/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

function extractOrigin() {
  const { CORS_ORIGIN: origin } = process.env;
  if (typeof origin === 'string') {
    if (origin === 'true') {
      return true;
    }

    if (origin === 'false') {
      return false;
    }

    return origin
      .split(',')
      .map(endpoint => endpoint.trim())
      .filter(Boolean);
  }

  // default
  return true;
}

function extractCorsConfigFromEnv() {
  return {
    origin: extractOrigin(),
  };
}

module.exports = {
  extractCorsConfigFromEnv,
};
