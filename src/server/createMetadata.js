/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import _ from 'lodash';
import { Metadata } from 'grpc';

function createMetadata(values: { [key: string]: string }) {
  const metadata = new Metadata();
  _.forOwn(values, (value, key) => metadata.set(key, value));
  return metadata;
}

export default createMetadata;
