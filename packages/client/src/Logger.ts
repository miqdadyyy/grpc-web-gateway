// Copyright 2018 dialog LLC <info@dlg.im>

export interface Logger {
  log(...args: Array<unknown>): unknown;
  error(...args: Array<unknown>): unknown;
  info(...args: Array<unknown>): unknown;
  warn(...args: Array<unknown>): unknown;
}

export const silentLogger: Logger = {
  log: () => undefined,
  error: () => undefined,
  info: () => undefined,
  warn: () => undefined,
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
