import { listFoldr } from './58';
import { List } from '../chap5/12';

export const fromArray = <T>(array: T[]): List<T> =>
  array.reduce(
    (accumulator, item) =>
      listFoldr.append(accumulator)(listFoldr.cons(item, listFoldr.empty())),
    listFoldr.empty<T>()
  );
