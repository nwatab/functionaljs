import { cons, List, empty, match } from './12';

export const length = <T>(list: List<T>): number => {
  return match(list, {
    empty: () => 0,
    cons: (head, tail) => 1 + length(tail),
  });
};

export const append = <T>(xs: List<T>, ys: List<T>): List<T> => {
  return match(xs, {
    empty: () => ys,
    cons: (head, tail) => cons(head, append(tail, ys)),
  });
};

export const reverse = <T>(list: List<T>): List<T> => {
  const reverseHelper = <T>(list: List<T>, accumulator: List<T>): List<T> => {
    return match(list, {
      empty: () => accumulator,
      cons: (head, tail) => reverseHelper(tail, cons(head, accumulator)),
    });
  };
  return reverseHelper(list, empty());
};
