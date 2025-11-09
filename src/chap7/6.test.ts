import expect from 'expect.js';
import { exponential } from './6';

describe('exponential function', () => {
  it('should calculate power using recursion', () => {
    expect(exponential(2)(0)).to.eql(1); // 2^0
    expect(exponential(2)(3)).to.eql(8); // 2^3
    expect(exponential(3)(4)).to.eql(81); // 3^4
  });
});
