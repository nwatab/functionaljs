import { cons, empty, head, List, match } from '../chap5/12';
import { reverse } from '../chap5/25';
import { alwaysOne } from '../chap6/6';
import { compose } from './16';

export const last = <T>(alist: List<T>): T | null =>
  compose<List<T>, List<T>, T | null>(head, reverse)(alist);

export const flip =
  <S, T, U>(fun: (y: T) => (x: S) => U) =>
  (x: S) =>
  (y: T) =>
    fun(y)(x);

const sum = (alist: List<number>): number => {
  var sumHelper = (alist: List<number>, accumulator: number): number =>
    match(alist, {
      empty: () => {
        return accumulator;
      },
      cons: (head, tail) => {
        return sumHelper(tail, accumulator + head);
      },
    });

  return sumHelper(alist, 0);
};

const map =
  <S, T>(alist: List<S>) =>
  (transform: (arg: S) => T): List<T> =>
    match(alist, {
      empty: () => empty(),
      cons: (head, tail) => cons(transform(head), map<S, T>(tail)(transform)),
    });

export const length = <T>(alist: List<T>): number =>
  compose(sum, flip(map)(alwaysOne))(alist);
