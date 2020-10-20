// Copyright 2018 dialog LLC <info@dlg.im>

import { StatusfulTransport, Transport } from '../transport';

export function retryTransportDecorator(
  { debug }: { debug: boolean } = { debug: false },
): (factory: () => StatusfulTransport) => Transport {
  return (factory) => {
    const LOG_PREFIX = 'RetryTransport';
    let nextPeriod = 0;
    let logger: { log: <T>(...args: Array<T>) => void } = {
      log: () => undefined,
    };

    if (debug) {
      logger = {
        log: (...args) => console.log(`[${LOG_PREFIX}]`, ...args),
      };
    }

    let origin = factory();

    const setupWsTransport = () => {
      const nextInterval = Math.E ** (nextPeriod * 0.2) * 1000;
      logger.log({ nextInterval });
      origin = factory();
      origin.onClose(() => {
        logger.log('Connection closed');
        nextPeriod = Math.min(nextPeriod + 1, 20);

        logger.log('Increased period', String(nextPeriod));
        setTimeout(() => {
          logger.log('Try reconnect');
          setupWsTransport();
        }, nextInterval);
      });
      origin.onOpen(() => {
        logger.log('Opened');
        nextPeriod = 0;
      });
    };

    setupWsTransport();

    return {
      send: origin.send,
      onMessage: origin.onMessage,
      onError: origin.onError,
    };
  };
}
