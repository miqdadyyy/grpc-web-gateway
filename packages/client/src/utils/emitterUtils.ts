import EventEmitter, {
  EventListener,
  EventNames,
  ValidEventTypes,
} from 'eventemitter3';
import { Unbind } from '../types';

export function bindEvent<
  EventTypes extends ValidEventTypes,
  EventName extends EventNames<EventTypes>
>(
  emitter: EventEmitter<EventTypes>,
  event: EventName,
  listener: EventListener<EventTypes, EventName>,
): Unbind {
  emitter.on(event, listener);
  return () => emitter.off(event, listener);
}
