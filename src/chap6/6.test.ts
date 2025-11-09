import expect from 'expect.js';
import { alwaysOne } from './6';

describe('alwaysOne function', () => {
  it('should always return 1', () => {
    expect(alwaysOne(1)).to.eql(1);
    expect(alwaysOne('a')).to.eql(1);
  });
});
