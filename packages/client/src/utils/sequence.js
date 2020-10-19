// @flow strict
// Copyright 2018 dialog LLC <info@dlg.im>

import { nanoid } from 'nanoid';

export type Sequence = {|
  resetSequence(): void,
  deleteId(id: string): void,
  next(): string,
|};

export function createSequence(
  maxId: number = Number.MAX_SAFE_INTEGER,
  fallback: () => string = nanoid,
): Sequence {
  const deletedIds: Array<string> = [];
  let id = 0;

  return {
    resetSequence() {
      id = 0;
    },
    deleteId(id: string) {
      deletedIds.push(id);
    },
    next() {
      if (deletedIds.length > 0) {
        return deletedIds.shift();
      } else if (id < maxId) {
        return (++id).toString();
      }

      return fallback();
    },
  };
}
