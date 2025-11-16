import expect from 'expect.js';
import { exp } from './2';

describe('式の代数的データ構造', () => {
  it('\\x.\\y.x', () => {
    /* λx.λy.x */
    exp.match(
      exp.lambda(
        exp.variable('x'),
        exp.lambda(exp.variable('y'), exp.variable('x'))
      ),
      {
        lambda: (variable, _arg) => {
          expect(variable).to.a('function');
        },
      }
    );
  });
});
