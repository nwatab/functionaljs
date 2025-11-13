import expect from 'expect.js';
import { multipleOf } from './10';
describe('multipleOf function', () => {
  it('correctly identifies multiples', () => {
    const even = multipleOf(2);
    expect(even(2)).to.eql(true);
    expect(even(3)).to.eql(false);
  });
});
