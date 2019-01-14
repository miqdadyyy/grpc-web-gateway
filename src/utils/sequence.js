/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import nanoid from 'nanoid';

let id = 0;
let maxId = Number.MAX_SAFE_INTEGER;

const generateFallbackId = (): string => nanoid();

// generate sequence id
export const generateId = (forceFallback: boolean = false): string => {
  if (id === maxId || forceFallback) {
    return generateFallbackId(); // fallback ;-)
  } else {
    return (++id).toString();
  }
};

export const resetSequence = (to: number = 0) => {
  id = to;
};

export const setMaxId = (newMaxId: number) => {
  maxId = newMaxId;
};

type Sequence = {|
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
      } else {
        return fallback();
      }
    },
  };
}
