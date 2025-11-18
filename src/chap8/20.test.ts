import expect from 'expect.js';
import { pair } from '../chap7/94';
import { evaluate, exp } from './20';
import { env } from './5';
import { list } from '../chap7/58';

describe('log evaluator test', () => {
  it('log evaluator evaluates number', () => {
    pair.match(evaluate(exp.log(exp.num(2)), env.empty), {
      cons: (value, log) => {
        expect(value).to.be(2);
        expect(list.toArray(log)).to.eql([2]);
      },
    });
  });
  it('log evaluator evaluates variables', () => {
    const newEnv = env.extend('x', 1, env.empty);
    pair.match(evaluate(exp.log(exp.variable('x')), newEnv), {
      cons: (value, log) => {
        expect(value).to.eql(1);
        expect(list.toArray(log)).to.eql([1]);
      },
    });
  });
  it('log evaluator evaluates operations', () => {
    pair.match(evaluate(exp.log(exp.add(exp.num(1), exp.num(2))), env.empty), {
      cons: (value, log) => {
        expect(value).to.be(3);
        expect(list.toArray(log)).to.eql([3]);
      },
    });
    pair.match(evaluate(exp.log(exp.add(exp.num(1), exp.num(2))), env.empty), {
      cons: (value, log) => {
        expect(value).to.be(3);
        expect(list.toArray(log)).to.eql([3]);
      },
    });
    const theExp = exp.log(
      exp.app(
        exp.lambda(
          exp.variable('n'),
          exp.add(exp.log(exp.num(1)), exp.variable('n'))
        ),
        exp.log(exp.num(2))
      )
    );
    pair.match(evaluate(theExp, env.empty), {
      cons: (value, log) => {
        expect(value).to.eql(3);
        expect(list.toArray(log)).to.eql([2, 1, 3]);
      },
    });
  });
  it('Log evaluator evaluates functions', () => {
    const expression = exp.app(
      exp.lambda(
        exp.variable('x'),
        exp.add(exp.variable('x'), exp.variable('x'))
      ),
      exp.num(2)
    );
    expect(pair.left(evaluate(expression, env.empty))).to.eql(4);
    expect(list.toArray(pair.right(evaluate(expression, env.empty)))).to.eql(
      []
    );
  });
  it('Log evaluator evaluates curried functions', () => {
    const expression = exp.app(
      exp.app(
        exp.lambda(
          exp.variable('x'),
          exp.lambda(
            exp.variable('y'),
            exp.add(exp.variable('x'), exp.variable('y'))
          )
        ),
        exp.num(2)
      ),
      exp.num(3)
    );
    expect(pair.left(evaluate(expression, env.empty))).to.eql(5);
  });
});
