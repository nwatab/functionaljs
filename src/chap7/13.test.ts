import expect from 'expect.js';
import { isOdd } from './13';

describe('not function', () => {
  it('correctly identifies odd and even numbers', () => {
    expect(isOdd(2)).to.eql(false);
    expect(isOdd(3)).to.eql(true);
  });
});
