/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

import { CORS_HTTP_METHODS, parseCorsConfigFromEnv } from './configParsers';

describe('parseCorsConfigFromEnv', () => {
  beforeEach(() => {
    delete process.env.CORS_ORIGIN;
  });

  it('should return default if there is no env', () => {
    const result = parseCorsConfigFromEnv();
    expect(result).toEqual({
      origin: true,
      methods: CORS_HTTP_METHODS,
    });
  });

  it('should parse "true"', () => {
    process.env.CORS_ORIGIN = 'true';

    const result = parseCorsConfigFromEnv();
    expect(result).toEqual({
      origin: true,
      methods: CORS_HTTP_METHODS,
    });
  });

  it('should parse "false"', () => {
    process.env.CORS_ORIGIN = 'false';

    const result = parseCorsConfigFromEnv();
    expect(result).toEqual({
      origin: false,
      methods: CORS_HTTP_METHODS,
    });
  });

  it('should parse array', () => {
    process.env.CORS_ORIGIN = 'https://dlg.im';

    const result = parseCorsConfigFromEnv();
    expect(result).toEqual({
      origin: ['https://dlg.im'],
      methods: CORS_HTTP_METHODS,
    });
  });

  it('should parse array and filter bad characters', () => {
    process.env.CORS_ORIGIN =
      'https://dlg.im, https://test.dlg.im,, https://example.org';

    const result = parseCorsConfigFromEnv();
    expect(result).toEqual({
      origin: ['https://dlg.im', 'https://test.dlg.im', 'https://example.org'],
      methods: CORS_HTTP_METHODS,
    });
  });
});
