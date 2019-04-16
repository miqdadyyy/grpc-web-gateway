// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

export interface Logger {
  log(...Array<mixed>): mixed;
  error(...Array<mixed>): mixed;
  info(...Array<mixed>): mixed;
  warn(...Array<mixed>): mixed;
}

const noop = () => void 'noop';

export const silentLogger: Logger = {
  log: noop,
  error: noop,
  info: noop,
  warn: noop,
};

export const debugLoggerDecorator = (debug: boolean) => (
  logger: Logger,
): Logger => (debug ? logger : silentLogger);

export const prefixLoggerDecorator = (prefix: string) => (
  logger: Logger,
): Logger => ({
  log: (...args) => logger.log(prefix, ...args),
  error: (...args) => logger.error(prefix, ...args),
  info: (...args) => logger.info(prefix, ...args),
  warn: (...args) => logger.warn(prefix, ...args),
});
