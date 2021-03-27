// Copyright 2018 dialog LLC <info@dlg.im>

import { Metadata } from '@dlghq/grpc-js';

export function createMetadata(
  initialMetadata: Metadata,
  values: { [key: string]: string },
): Metadata {
  const metadata = initialMetadata.clone();

  Object.entries(values).forEach(([key, value]) => {
    metadata.set(key, value);
  });

  return metadata;
}

export function normalizeGrpcMetadata(
  grpcMetadata: Metadata,
): { [key: string]: string } {
  const values = grpcMetadata.getMap();

  return Object.entries(values).reduce((metadata, [key, value]) => {
    try {
      return { ...metadata, [key]: JSON.stringify(value) };
    } catch (e) {
      return metadata;
    }
  }, {});
}
