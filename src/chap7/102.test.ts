import expect from 'expect.js';
import { stringOps } from './102';

describe('string module', () => {
  it('head', () => {
    expect(stringOps.head('abc')).to.eql('a');
  });
  it('tail', () => {
    expect(stringOps.tail('abc')).to.eql('c');
  });
});
