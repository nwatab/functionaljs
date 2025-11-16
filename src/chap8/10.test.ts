import expect from 'expect.js';
import { exp } from './2';
import { evaluate } from './10';
import { env } from './5';
import { ID } from '../chap7/85';

describe('evaluate', () => {
  it('number evaluation', () => {
    expect(evaluate(exp.num(2), env.empty)).to.eql(2);
  });

  it('variable evaluation', () => {
    const newEnv = env.extend('x', 1, env.empty);
    expect(evaluate(exp.variable('x'), newEnv)).to.eql(ID.unit(1));
    expect(evaluate(exp.variable('y'), newEnv)).to.be(ID.unit(undefined));
  });

  it('addition', () => {
    const addition = exp.add(exp.num(1), exp.num(2));
    expect(evaluate(addition, env.empty)).to.eql(ID.unit(3));
  });

  it('Identity monad evaluation', () => {
    expect(evaluate(exp.add(exp.num(1), exp.num(2)), env.empty)).to.be(
      ID.unit(3)
    );
  });

  it('function evaluation', () => {
    const expression = exp.app(
      exp.lambda(exp.variable('n'), exp.add(exp.variable('n'), exp.num(1))),
      exp.num(2)
    );
    expect(evaluate(expression, env.empty)).to.eql(ID.unit(3));
  });

  it('ID evaluator with function. x.add(x, x)(2)', () => {
    const expression = exp.app(
      exp.lambda(
        exp.variable('x'),
        exp.add(exp.variable('x'), exp.variable('x'))
      ),
      exp.num(2)
    );
    expect(evaluate(expression, env.empty)).to.eql(ID.unit(4)); // 書籍では.to.eql(4);となっている。
  });

  it('curried function evaluation', () => {
    const expression = exp.app(
      exp.app(
        exp.lambda(
          exp.variable('n'),
          exp.lambda(
            exp.variable('m'),
            exp.add(exp.variable('n'), exp.variable('m'))
          )
        ),
        exp.num(2)
      ),
      exp.num(3)
    );
    expect(evaluate(expression, env.empty)).to.eql(ID.unit(5));
  });
});
