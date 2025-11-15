import expect from 'expect.js';
import { IO } from './99';

describe('IO Monad', () => {
  it('run', () => {
    expect(IO.run(IO.println('名前はまだない'))).to.eql(null);
  });
});
