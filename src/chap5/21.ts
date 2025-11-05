import { cons, Data, empty, match } from "./12";

export const map = <T, R>(alist: Data<T>, transform: (value: T) => R): Data<R> => {
  return match(alist, {
    empty: () => empty(),
    cons: (head, tail) => cons(transform(head), map(tail, transform)),
  });
};

export const toArray = <T>(alist: Data<T>): T[] => {
  const toArrayHelper = <T>(alist: Data<T>, accumulator: T[]): T[] => 
    match(alist, {
      empty: () => accumulator,
      cons: (head, tail) => toArrayHelper(tail, accumulator.concat(head)),
    })
  return toArrayHelper(alist, []);
}