import expect from 'expect.js';
import { flip } from './22';
import { exponential } from './6';

describe('flip function', () => {
  it('flip base and exponent', () => {
    const square = flip(exponential)(2);
    expect(square(3)).to.eql(9); // 3^2
    const cube = flip(exponential)(3);
    expect(cube(2)).to.eql(8); // 2^3
  });
});
