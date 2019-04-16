declare module 'nanoevents' {
  declare export default class NanoEvents<T> {
    constructor(): NanoEvents<T>;

    on<K: $Keys<T>>(event: K, cb: ($ElementType<T, K>) => void): () => void;

    emit<K: $Keys<T>>(event: K, data?: $ElementType<T, K>): void;
  }
}

declare module 'nanoevents/unbind-all' {
  import type NanoEvents from 'nanoevents';

  declare export default (NanoEvents<*>) => void;
}
