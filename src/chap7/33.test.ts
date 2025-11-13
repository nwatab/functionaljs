import expect from 'expect.js';
import { enumFrom } from '../chap6/14';
import { generate } from './33';

describe('generator', () => {
  it('integer generator', () => {
    const integers = enumFrom(0);
    const intGenerator = generate(integers);
    expect(intGenerator()).to.eql(0);
    expect(intGenerator()).to.eql(1);
    expect(intGenerator()).to.eql(2);
  });
});
