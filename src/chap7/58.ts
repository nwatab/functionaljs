import { List } from '../chap5/12';
import { list as baseList } from '../chap6/14';

export const foldr =
  <Item>(alist: List<Item>) =>
  <Result>(accumulator: Result) =>
  (callback: (item: Item) => (acc: Result) => Result) =>
    list.match(alist, {
      empty: () => accumulator,
      cons: (head: Item, tail: List<Item>): Result =>
        callback(head)(foldr(tail)(accumulator)(callback)),
    });

export const list = {
  ...baseList,
  foldr,
  append:
    <T>(xs: List<T>) =>
    (ys: List<T>): List<T> =>
      list.match(xs, {
        empty: () => ys,
        cons: (head, tail) => baseList.cons(head, list.append(tail)(ys)),
      }),
};

export const sum = (alist: List<number>) =>
  foldr(alist)(0)((item) => (accumulator) => accumulator + item);

export const length = <T>(alist: List<T>) =>
  foldr(alist)(0)((item) => (accumulator) => accumulator + 1);

export const product = (alist: List<number>) =>
  foldr(alist)(1)((item) => (accumulator) => accumulator * item);

export const all = (alist: List<boolean>) =>
  foldr(alist)(true)((item) => (accumulator) => accumulator && item);

export const any = (alist: List<boolean>) =>
  foldr(alist)(false)((item) => (accumulator) => accumulator || item);

export const reverse = <T>(alist: List<T>) =>
  foldr(alist)(list.empty())(
    (item) => (accumulator) =>
      list.append(accumulator)(list.cons(item, list.empty()))
  );

export const find =
  <T>(alist: List<T>) =>
  (predicate: (item: T) => boolean): T | null =>
    foldr(alist)<T | null>(null)(
      (item) => (accumulator) => (predicate(item) ? item : accumulator)
    );
