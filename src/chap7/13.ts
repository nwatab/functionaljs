import { multipleOf } from './10';

export const not =
  <T>(predicate: (arg: T) => boolean) =>
  (arg: T): boolean =>
    !predicate(arg);

export const isEven = multipleOf(2);
export const isOdd = not(isEven);
