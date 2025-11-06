import { cons, Data, empty, match } from './12';

export const length = <T>(list: Data<T>): number => {
  return match(list, {
    empty: () => 0,
    cons: (head, tail) => 1 + length(tail),
  });
};

export const append = <T>(xs: Data<T>, ys: Data<T>): Data<T> => {
  return match(xs, {
    empty: () => ys,
    cons: (head, tail) => cons(head, append(tail, ys)),
  });
};

export const reverse = <T>(list: Data<T>): Data<T> => {
  const reverseHelper = <T>(list: Data<T>, accumulator: Data<T>): Data<T> => {
    return match(list, {
      empty: () => accumulator,
      cons: (head, tail) => reverseHelper(tail, cons(head, accumulator)),
    });
  };
  return reverseHelper(list, empty());
};
