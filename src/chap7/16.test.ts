import expect from 'expect.js';
import { compose } from './16';

describe('composition test', () => {
  it('should compose two functions', () => {
    const f = (x: number) => x * x + 1;
    const g = (x: number) => x - 2;

    expect(compose(f, g)(2)).to.eql(f(g(2)));
  });
});
