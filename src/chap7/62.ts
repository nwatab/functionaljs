import { list } from './58';
import { List } from '../chap5/12';

export const fromArray = <T>(array: T[]): List<T> =>
  array.reduce(
    (accumulator, item) =>
      list.append(accumulator)(list.cons(item, list.empty())),
    list.empty<T>()
  );
