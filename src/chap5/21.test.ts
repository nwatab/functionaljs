import { cons, empty } from './12';
import { map, toArray } from './21';
import expect from 'expect.js';

describe('Chapter 5-21 map function', () => {
  it('再帰によるmap関数', (next) => {
    const succ = (n: number): number => {
      return n + 1;
    };
    expect(toArray(map(cons(1, cons(2, cons(3, empty()))), succ))).to.eql([
      2, 3, 4,
    ]);
    next();
  });
});
