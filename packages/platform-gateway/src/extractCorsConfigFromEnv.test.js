/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

const { extractCorsConfigFromEnv } = require('./extractCorsConfigFromEnv');

describe('extractCorsConfigFromEnv', () => {
  beforeEach(() => {
    delete process.env.CORS_ORIGIN;
  });

  it('should return default if there is no env', () => {
    const result = extractCorsConfigFromEnv();
    expect(result).toEqual({ origin: true });
  });

  it('should parse "true"', () => {
    process.env.CORS_ORIGIN = 'true';

    const result = extractCorsConfigFromEnv();
    expect(result).toEqual({ origin: true });
  });

  it('should parse "false"', () => {
    process.env.CORS_ORIGIN = 'false';

    const result = extractCorsConfigFromEnv();
    expect(result).toEqual({ origin: false });
  });

  it('should parse array', () => {
    process.env.CORS_ORIGIN = 'https://dlg.im';

    const result = extractCorsConfigFromEnv();
    expect(result).toEqual({ origin: ['https://dlg.im'] });
  });

  it('should parse array and filter bad characters', () => {
    process.env.CORS_ORIGIN =
      'https://dlg.im, https://test.dlg.im,, https://example.org';

    const result = extractCorsConfigFromEnv();
    expect(result).toEqual({
      origin: ['https://dlg.im', 'https://test.dlg.im', 'https://example.org'],
    });
  });
});
