import expect from 'expect.js';
import { isEmpty, empty, cons, head, tail } from './12.js';

describe('List operations', () => {
  it('isEmpty should return true for empty list', () => {
    expect(isEmpty(empty())).to.eql(true);
  });

  it('isEmpty should return false for non-empty list', () => {
    expect(isEmpty(cons(1, empty()))).to.eql(false);
  });

  it('head should return the first element', () => {
    expect(head(cons(1, empty()))).to.eql(1);
  });

  it('tail should return the rest of the list', () => {
    expect(head(tail(cons(1, cons(2, empty())))!)).to.eql(2);
  });
});