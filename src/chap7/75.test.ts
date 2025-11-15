import expect from 'expect.js';
import { exp, driver, Exp } from './75';
import { list } from '../chap6/14';
import { fromArray } from './62';

describe('non-deterministic calculator', () => {
  it('amb[1, 2] + 3  = amb[4, 5]', () => {
    const ambExp = exp.add(
      exp.amb(list.cons(exp.num(1), list.cons(exp.num(2), list.empty()))),
      exp.num(3)
    );
    const calculator = driver(ambExp, (a, b) => a + b);
    expect(calculator()).to.eql(4); // 1 + 3
    expect(calculator()).to.eql(5); // 2 + 3
    expect(calculator()).to.eql(null);
  });
  it('amb[1, 2] + amb[3, 4] = amb[4, 5, 5, 6]', () => {
    /* amb[1, 2] + amb[3, 4] = amb[4, 5, 5, 6] */
    const ambExp = exp.add(
      exp.amb(fromArray<Exp<number>>([exp.num(1), exp.num(2)])),
      exp.amb(fromArray<Exp<number>>([exp.num(3), exp.num(4)]))
    );
    const calculator = driver(ambExp, (a, b) => a + b);
    expect(calculator()).to.eql(4); // 1 + 3
    expect(calculator()).to.eql(5); // 1 + 4
    expect(calculator()).to.eql(5); // 2 + 3
    expect(calculator()).to.eql(6); // 2 + 4
    expect(calculator()).to.eql(null);
  });
  it('amb[1,2,3] + amb[10,20] = amb[11,21,12,22,13,23]', () => {
    const ambExp = exp.add(
      exp.amb(fromArray<Exp<number>>([exp.num(1), exp.num(2), exp.num(3)])),
      exp.amb(fromArray<Exp<number>>([exp.num(10), exp.num(20)]))
    );
    const calculator = driver(ambExp, (a, b) => a + b);
    expect(calculator()).to.eql(11);
    expect(calculator()).to.eql(21);
    expect(calculator()).to.eql(12);
    expect(calculator()).to.eql(22);
    expect(calculator()).to.eql(13);
    expect(calculator()).to.eql(23);
    expect(calculator()).to.eql(null);
  });
});
