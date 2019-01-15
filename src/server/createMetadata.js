/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
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

function createMetadata(values: {
  [key: string]: MetadataValue,
}): GrpcMetadata {
  const metadata = new Metadata();
  _.forOwn(values, (value, key) => metadata.set(key, value));
  return metadata;
}

export default createMetadata;
