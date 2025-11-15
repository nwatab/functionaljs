import { List, Pattern } from '../chap5/12';

type LazyPattern<T, R> = {
  empty(): R;
  cons(head: T, tailThunk: () => Stream<T>): R;
};
export type Stream<T> = <R>(pattern: LazyPattern<T, R>) => R;

type StreamOps = {
  match<T, R>(data: Stream<T>, pattern: LazyPattern<T, R>): R;
  empty<T>(): Stream<T>;
  cons<T>(head: T, tailThunk: () => Stream<T>): Stream<T>;
  head<T>(aStream: Stream<T>): T | null;
  tail<T>(aStream: Stream<T>): Stream<T> | null;
  take<T>(aStream: Stream<T>, n: number): List<T>;
};

export const stream: StreamOps = {
  match: (data, pattern) => data(pattern),
  empty: () => (pattern) => pattern.empty(),
  cons: (head, tailThunk) => (pattern) => pattern.cons(head, tailThunk),
  head: (aStream) =>
    stream.match(aStream, {
      empty: () => null,
      cons: (value, tailThunk) => value,
    }),
  tail: (aStream) =>
    stream.match(aStream, {
      empty: () => null,
      cons: (head, tailThunk) => tailThunk(),
    }),
  take: (aStream, n) =>
    stream.match(aStream, {
      empty: () => list.empty(),
      cons: (head, tailThunk) => {
        if (n <= 0) return list.empty();
        return list.cons(head, stream.take(tailThunk(), n - 1));
      },
    }),
};

type ListOps = {
  match<T, R>(aList: List<T>, pattern: Pattern<T, R>): R;
  empty<T>(): List<T>;
  cons<T>(value: T, tail: List<T>): List<T>;
  toArray<T>(aList: List<T>): T[];
};

export const list: ListOps = {
  match: <T, R>(aList: List<T>, pattern: Pattern<T, R>): R => aList(pattern),
  empty:
    <T>(): List<T> =>
    <R>(pattern: Pattern<T, R>) =>
      pattern.empty(),
  cons:
    <T>(value: T, tail: List<T>): List<T> =>
    <R>(pattern: Pattern<T, R>) =>
      pattern.cons(value, tail),
  toArray: <T>(aList: List<T>): T[] => {
    const toArrayHelper = (alist: List<T>, accumulator: T[]): T[] => {
      return list.match(alist, {
        empty: () => accumulator,
        cons: (head: T, tail: List<T>) =>
          toArrayHelper(tail, accumulator.concat(head)),
      });
    };
    return toArrayHelper(aList, []);
  },
};

export const enumFrom = (n: number): Stream<number> => {
  return stream.cons(n, () => enumFrom(n + 1));
};
