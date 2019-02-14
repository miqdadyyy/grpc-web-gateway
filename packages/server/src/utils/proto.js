// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

import { flatten, pipe, map, mergeAll, toPairs } from 'lodash/fp';
import * as protoLoader from '@grpc/proto-loader';
import glob from 'glob';

type GrpcMethodDefinition = {
  path: string,
  requestStream: boolean,
  responseStream: boolean,
  originalName: string,
};

export const loadDefinitions = (files: Array<string>) => {
  const definitions = protoLoader.loadSync(files, {
    longs: String,
    enums: String,
    bytes: String,
    arrays: true,
    defaults: false,
    keepCase: false,
  });

  return definitions;
};

export const getDefinitions = pipe([
  map(glob.sync),
  flatten,
  map(loadDefinitions),
]);

export const parseProtoFiles: (
  protoFiles: Array<string>,
) => Map<string, { [methodName: string]: GrpcMethodDefinition }> = pipe([
  getDefinitions,
  mergeAll,
  toPairs,
  entries => new Map(entries),
]);
