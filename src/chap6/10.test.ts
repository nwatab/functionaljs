import expect from 'expect.js';
import { conditional } from './10';

describe('正格評価のJSで遅延評価', () => {
  it('条件文による遅延評価', () => {
    expect(conditional(1)).to.eql(true);
  });
});
