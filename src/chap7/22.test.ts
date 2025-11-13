import expect from 'expect.js';
import { all, any, init, last, length, none } from './22';
import { cons, empty } from '../chap5/12';
import { toArray } from '../chap5/21';

describe('composition example', () => {
  const alist = cons(1, cons(2, cons(3, empty())));
  it('calculates length of a list', () => {
    expect(length(alist)).to.eql(3);
    expect(length(empty())).to.eql(0);
  });
  it('get last element of a list', () => {
    expect(last(alist)).to.eql(3);
    expect(last(cons('a', cons('b', cons('c', empty()))))).to.eql('c');
    expect(last(empty())).to.eql(null);
  });
  it('init function returns all but the last element', () => {
    const y = cons(1, cons(2, empty()));
    expect(toArray(init(alist))).to.eql(toArray(y));
  });
  it('all function', () => {
    expect(all((x: number) => x > 0)(alist)).to.eql(true);
    expect(all((x: number) => x > 1)(alist)).to.eql(false);
  });
  it('any function', () => {
    expect(any((x: number) => x > 2)(alist)).to.eql(true);
    expect(any((x: number) => x > 3)(alist)).to.eql(false);
  });
  it('none function', () => {
    expect(none((x: number) => x < 0)(alist)).to.eql(true);
    expect(none((x: number) => x < 2)(alist)).to.eql(false);
  });
});
