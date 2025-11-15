import expect from 'expect.js';
import { identity, succ } from './67';
import { add } from './70';

describe('continues', () => {
  it('succ(3, (succResult) => add(2, succResult, identity)) should return 6', () => {
    expect(succ(3, (succResult) => add(2, succResult, identity))).to.eql(6);
  });
});
