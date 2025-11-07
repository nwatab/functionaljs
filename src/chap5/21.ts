import { cons, List, empty, match } from './12';

export const map = <T, R>(
  alist: List<T>,
  transform: (value: T) => R
): List<R> => {
  return match(alist, {
    empty: () => empty(),
    cons: (head, tail) => cons(transform(head), map(tail, transform)),
  });
};

export const toArray = <T>(alist: List<T>): T[] => {
  const toArrayHelper = <T>(alist: List<T>, accumulator: T[]): T[] =>
    match(alist, {
      empty: () => accumulator,
      cons: (head, tail) => toArrayHelper(tail, accumulator.concat(head)),
    });
  return toArrayHelper(alist, []);
};
