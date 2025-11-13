import { listFoldr } from './58';

export const fromArray = <T>(array: T[]) =>
  array.reduce(
    (accumulator, item) =>
      listFoldr.append(accumulator)(listFoldr.cons(item, listFoldr.empty())),
    listFoldr.empty()
  );
