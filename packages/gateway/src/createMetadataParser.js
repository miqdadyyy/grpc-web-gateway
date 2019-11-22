// @flow strict

// Copyright 2018 dialog LLC <info@dlg.im>

import _ from 'lodash';
import { Metadata } from 'grpc';

export type MetadataParser = (message: http$IncomingMessage<>) => Metadata;
export type HeaderFilter = (key: string, value: string) => boolean;

export function createMetadataParser(filter: HeaderFilter): MetadataParser {
  return message => {
    const metadata = new Metadata();
    _.forOwn(message.headers, (value, key) => {
      if (filter(key, value)) {
        metadata.set(key, value);
      }
    });

    return metadata;
  };
}
