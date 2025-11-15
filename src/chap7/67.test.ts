import expect from 'expect.js';
import { identity, succ } from './67';

describe('continue', () => {
  it('succ(1, identity) should return 2', () => {
    expect(succ(1, identity)).to.eql(2);
  });
});
