import { Emitter } from 'nanoevents';

export function unbindAll(emitter: Emitter): void {
  emitter.events = {};
}
