/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow strict
 */

import _ from 'lodash';
import { Metadata } from 'grpc';

type MetadataValue = string | Buffer;

type GrpcMetadata = {
  add(key: string, value: MetadataValue): void,
  add(key: string, value: MetadataValue): void,
  get(key: string): Array<MetadataValue>,
  getMap(): {
    [key: string]: MetadataValue,
  },
  remove(key: string): void,
};

export function createMetadata(
  initialMetadata: Metadata,
  values: {
    [key: string]: string,
  },
): GrpcMetadata {
  const metadata = initialMetadata.clone();
  _.forOwn(values, (value, key) => metadata.set(key, value));

  return metadata;
}

export function normalizeGrpcMetadata(grpcMetadata: {
  [string]: mixed,
}): { [string]: string | Buffer } {
  return Object.entries(grpcMetadata).reduce((metadata, [key, value]) => {
    try {
      return { ...metadata, [key]: JSON.stringify(value) };
    } catch (e) {
      return metadata;
    }
  }, {});
}
