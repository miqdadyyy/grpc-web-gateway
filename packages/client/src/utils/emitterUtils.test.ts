import EventEmitter from 'eventemitter3';
import { bindEvent } from './emitterUtils';

test('EventEmitter clearing all listeners', () => {
  const emitter = new EventEmitter();

  const x1 = jest.fn();
  emitter.on('x', x1);

  const f1 = jest.fn();
  const f2 = jest.fn();
  const f3 = jest.fn();

  emitter.on('foo', f1);
  emitter.on('foo', () => {
    f2();
    emitter.removeAllListeners();
  });
  emitter.on('foo', f3);

  emitter.emit('foo');
  emitter.emit('foo');
  expect(f1).toBeCalledTimes(1);
  expect(f2).toBeCalledTimes(1);
  expect(f3).toBeCalledTimes(1);

  emitter.emit('x');
  expect(x1).toBeCalledTimes(0);
});

describe('bindEvent()', () => {
  it('should return "unbind" callback which removes a listener', () => {
    const emitter = new EventEmitter();

    const listener = jest.fn();
    const unbind = bindEvent(emitter, 'event', listener);

    emitter.emit('event');
    expect(listener).toBeCalledTimes(1);

    listener.mockClear();
    unbind();
    emitter.emit('event');
    expect(listener).toBeCalledTimes(0);
  });
});
