import expect from 'expect.js';

import { add, calculate, mul, num } from './28';

describe('数式を再起的に計算する', () => {
  it('1 + (2 * 3) を計算する', () => {
    const expression = add(num(1), mul(num(2), num(3)));
    expect(calculate(expression)).to.eql(7);
  });
});
