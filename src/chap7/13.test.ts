import expect from 'expect.js';
import { not } from './13';
import { multipleOf } from './10';

describe('not function', () => {
  const isEven = multipleOf(2);
  const isOdd = not(isEven);
  it('correctly identifies odd and even numbers', () => {
    expect(isOdd(2)).to.eql(false);
    expect(isOdd(3)).to.eql(true);
  });
});
