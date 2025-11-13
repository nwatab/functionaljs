import expect from 'expect.js';
import { factorial } from './24';

describe('Y combinator', () => {
  it('factorial', () => {
    expect(factorial(3)).to.eql(6);
  });
});
