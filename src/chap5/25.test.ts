import expect from 'expect.js';

import { cons, empty } from './12';
import { toArray } from './21';
import { length, append, reverse } from './25';

describe('再帰的データ構造としてのリスト', () => {
  it('再帰によるlength関数', (next) => {
    expect(
      length(cons(1, cons(2, cons(3, empty())))) // [1,2,3]の長さは 3
    ).to.eql(3);
    next();
  });

  it('再帰によるappend関数', (next) => {
    /* #@range_begin(list_append_test) */
    const xs = cons(1, cons(2, empty()));
    const ys = cons(3, cons(4, empty()));
    expect(
      toArray(append(xs, ys)) // toArray関数でリストを配列に変換する
    ).to.eql([1, 2, 3, 4]);
    /* #@range_end(list_append_test) */
    next();
  });

  it('再帰によるreverse関数', (next) => {
    const xs = cons(1, cons(2, cons(3, empty())));
    const ys = cons(3, cons(2, cons(1, empty())));
    expect(
      toArray(reverse(xs)) // toArray関数でリストを配列に変換する
    ).to.eql(toArray(ys));
    next();
  });
});
