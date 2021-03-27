// Copyright 2018 dialog LLC <info@dlg.im>

import { Metadata } from '@dlghq/grpc-js';
import { IncomingMessage } from 'http';

export type MetadataParser = (message: IncomingMessage) => Metadata;
export type HeaderFilter = (key: string, value: string) => boolean;

export function createMetadataParser(filter: HeaderFilter): MetadataParser {
  return (message) => {
    const metadata = new Metadata();

    Object.entries(message.headers).forEach(([key, valueOrArray]) => {
      if (valueOrArray === undefined) {
        return;
      }

      const values = Array.isArray(valueOrArray)
        ? valueOrArray
        : [valueOrArray];
      let hasValue = false;

      values.forEach((value) => {
        if (filter(key, value)) {
          if (hasValue) {
            metadata.add(key, value);
          } else {
            metadata.set(key, value);
            hasValue = true;
          }
        }
      });
    });

    return metadata;
  };
}
