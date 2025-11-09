import expect from 'expect.js';
import { last, length } from './22';
import { cons, empty } from '../chap5/12';

describe('composition example', () => {
  it('calculates length of a list', () => {
    expect(length(cons(1, cons(2, cons(3, empty()))))).to.eql(3);
    expect(length(empty())).to.eql(0);
  });
  it('get last element of a list', () => {
    expect(last(cons(1, cons(2, cons(3, empty()))))).to.eql(3);
    expect(last(cons('a', cons('b', cons('c', empty()))))).to.eql('c');
    expect(last(empty())).to.eql(null);
  });
});
