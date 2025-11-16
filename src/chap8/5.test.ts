import expect from 'expect.js';
import { env } from './5';

describe('環境', () => {
  it('variable binding and environment semantics', () => {
    expect(
      (() => {
        const newEnv = env.extend('a', 1, env.empty);
        return env.lookup('a', newEnv);
      })()
    ).to.eql(1);
    expect(
      (() => {
        const initEnv = env.empty;
        const firstEnv = env.extend('a', 1, initEnv);
        const secondEnv = env.extend('b', 3, firstEnv);
        return env.lookup('b', secondEnv);
      })()
    ).to.eql(3);
    expect(
      (() => {
        const initEnv = env.empty;
        const outerEnv = env.extend('x', 1, initEnv);
        const closureEnv = env.extend('y', 2, outerEnv);
        return env.lookup('x', closureEnv) + env.lookup('y', closureEnv);
      })()
    ).to.eql(3);
  });
});
