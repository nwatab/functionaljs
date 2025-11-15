import expect from 'expect.js';
import { IO } from './94';

describe('IO Monad', () => {
  it('run println', () => {
    const initialWorld = null;
    expect(IO.run(IO.println('吾輩は猫である'))(initialWorld)).to.eql(null);
  });
});
