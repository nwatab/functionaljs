import expect from 'expect.js';
import { lazyMultiply } from './12';
import { infiniteLoop } from './10';

describe('関数で遅延評価', () => {
  it('掛け算で遅延評価を確認', () => {
    expect(
      lazyMultiply(
        () => 0,
        () => infiniteLoop()
      )
    ).to.eql(0);
  });
});
