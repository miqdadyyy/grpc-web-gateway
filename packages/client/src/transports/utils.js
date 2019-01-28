/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

export type Factory<T> = () => T;

export const map = <Origin, Result>(
  f: Origin => Result,
): ((Factory<Origin>) => Factory<Result>) => (
  factory: Factory<Origin>,
): Factory<Result> => () => f(factory());

export const of = <Origin>(origin: Origin): Factory<Origin> => () => origin;

export const chain = <Origin, Result>(
  originFactory: Factory<Origin>,
): (((Origin) => Factory<Result>) => Factory<Result>) => (
  f: Origin => Factory<Result>,
): Factory<Result> => f(originFactory());
