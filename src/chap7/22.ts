import { cons, empty, head, List, match, tail } from '../chap5/12';
import { reverse } from '../chap5/25';
import { alwaysOne } from '../chap6/6';
import { not } from './13';
import { compose } from './16';

const list = {
  match,
  empty,
  cons,
  head,
  tail,
  reverse,
  map:
    <S, T>(alist: List<S>) =>
    (transform: (arg: S) => T): List<T> =>
      match(alist, {
        empty: () => empty(),
        cons: (head, tail) => cons(transform(head), map<S, T>(tail)(transform)),
      }),
  sum: (alist: List<number>): number => {
    const sumHelper = (alist: List<number>, accumulator: number): number =>
      match(alist, {
        empty: () => {
          return accumulator;
        },
        cons: (head, tail) => {
          return sumHelper(tail, accumulator + head);
        },
      });

    return sumHelper(alist, 0);
  },
};

export const last = <T>(alist: List<T>): T | null =>
  compose<List<T>, List<T>, T | null>(head, reverse)(alist);

export const flip =
  <S, T, U>(fun: (y: T) => (x: S) => U) =>
  (x: S) =>
  (y: T) =>
    fun(y)(x);

const map =
  <S, T>(alist: List<S>) =>
  (transform: (arg: S) => T): List<T> =>
    match(alist, {
      empty: () => empty(),
      cons: (head, tail) => cons(transform(head), map<S, T>(tail)(transform)),
    });

export const length = <T>(alist: List<T>): number =>
  compose(list.sum, flip(list.map)(alwaysOne))(alist);

export const init = <T>(alist: List<T>): List<T> =>
  compose<List<T>, List<T>, List<T>>(
    list.reverse,
    compose<List<T>, List<T>, List<T>>(list.tail, list.reverse)
  )(alist);

export const and = (alist: List<boolean>): boolean =>
  list.match(alist, {
    empty: () => true,
    cons: (head, tail) => head && and(tail),
  });

export const or = (alist: List<boolean>): boolean =>
  list.match(alist, {
    empty: () => false,
    cons: (head, tail) => head || or(tail),
  });

export const all =
  <T>(predicate: (arg: T) => boolean) =>
  (alist: List<T>) =>
    compose(and, flip(list.map)(predicate))(alist);

export const any =
  <T>(predicate: (arg: T) => boolean) =>
  (alist: List<T>) =>
    compose(or, flip(list.map)(predicate))(alist);

export const none =
  <T>(predicate: (arg: T) => boolean) =>
  (alist: List<T>) =>
    compose(and, flip(list.map)(not(predicate)))(alist);
