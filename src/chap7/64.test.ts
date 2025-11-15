import expect from 'expect.js';
import { tarai } from './64';

describe('tarai', () => {
  it('tarai(2, 1, 0) should return 2', () => {
    expect(tarai(2, 1, 0)).to.eql(2);
  });
});
