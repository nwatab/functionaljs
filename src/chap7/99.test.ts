import expect from 'expect.js';
import { IOOps } from './99';

describe('IO Monad', () => {
  it('run', () => {
    expect(IOOps.run(IOOps.println('名前はまだない'))).to.eql(null);
  });
});
