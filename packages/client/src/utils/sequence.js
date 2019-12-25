// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

import nanoid from 'nanoid';

export type Sequence = {|
  next(): string,
|};

export function createSequence(
  maxId: number = Number.MAX_SAFE_INTEGER,
  fallback: () => string = nanoid,
): Sequence {
  let id = 0;

  return {
    next() {
      if (id < maxId) {
        return (++id).toString();
      }

      return fallback();
    },
  };
}
