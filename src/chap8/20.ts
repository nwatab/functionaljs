import { pair } from '../chap7/94';
import { list } from '../chap7/58';
import { exp as exp2 } from './2';
import type { Exp as Exp2, Pattern as Pattern2 } from './2';
import type { List } from '../chap5/12';
import { env, Environment } from './5';

type Pair<A, B> = <R>(pattern: { cons: (left: A, right: B) => R }) => R;

const match = <A, B, R>(
  data: Pair<A, B>,
  pattern: { cons: (left: A, right: B) => R }
): R => data(pattern);

export type Pattern<T> = Pattern2<T> & {
  log: (anExp: Exp<T>) => T;
  mul: (exp1: Exp<T>, exp2: Exp<T>) => T;
};

export type Exp<T> = (pattern: Pattern<T>) => T;

// Patternの型拡張に合わせて上書き
export const exp = {
  ...exp2,
  log:
    (anExp: Exp<any>): Exp<any> =>
    (pattern: Pattern<any>) =>
      pattern.log(anExp),
  mul:
    (exp1: Exp<any>, exp2: Exp<any>): Exp<any> =>
    (pattern: Pattern<any>) =>
      pattern.mul(exp1, exp2),
  add:
    (expL: Exp<any>, expR: Exp<any>): Exp<any> =>
    (pattern: Pattern<any>) =>
      pattern.add(expL as Exp2<any>, expR as Exp2<any>),
  lambda:
    (variable: Exp<any>, body: Exp<any>): Exp<any> =>
    (pattern: Pattern<any>) =>
      pattern.lambda(variable as Exp2<string>, body as Exp2<any>),
  app:
    (lambda: Exp<any>, arg: Exp<any>): Exp<any> =>
    (pattern: Pattern<any>) =>
      pattern.app(lambda as Exp2<any>, arg as Exp2<any>),
  match: <T>(data: Exp<T>, pattern: Pattern<T>): T => data(pattern),
};

type Log<A> = Pair<A, List<any>>;

export const LOG = {
  unit: <A>(value: A): Log<A> => pair.cons(value, list.empty()),
  flatMap:
    <A, B>(instanceM: Log<A>) =>
    (transform: (value: A) => Log<B>): Log<B> =>
      match(instanceM, {
        cons: (value, log) => {
          const newInstance = transform(value);
          return pair.cons(
            pair.left(newInstance),
            list.append(log)(pair.right(newInstance))
          );
        },
      }),
  output: <A>(value: A): Log<null> =>
    pair.cons(null, list.cons(value, list.empty())),
};

type Closure = (arg: number) => EvaluateResult;
type Value = number | Closure;
type EvaluateResult = Log<Value>;

export const evaluate: (
  anExp: Exp<EvaluateResult>,
  environment: Environment
) => EvaluateResult = (anExp, environment) =>
  exp.match(anExp, {
    log: (anExp: Exp<EvaluateResult>): EvaluateResult =>
      LOG.flatMap<Value, Value>(evaluate(anExp, environment))((value) =>
        LOG.flatMap<null, Value>(LOG.output(value))((_) => LOG.unit(value))
      ),
    num: (value): EvaluateResult => LOG.unit(value),
    variable: (name): EvaluateResult => LOG.unit(env.lookup(name, environment)),
    lambda: (variable, body): EvaluateResult =>
      LOG.unit((actualArg: number) =>
        evaluate(
          body,
          env.extend(
            exp.match(variable, {
              variable: (name: string) => name,
            } as any),
            actualArg,
            environment
          )
        )
      ),
    app: (lambda, arg): EvaluateResult =>
      LOG.flatMap<Value, Value>(evaluate(lambda, environment))((closure) =>
        LOG.flatMap<Value, Value>(evaluate(arg, environment))((actualArg) =>
          (closure as Closure)(actualArg as number)
        )
      ),
    add: (expL, expR): EvaluateResult =>
      LOG.flatMap<Value, Value>(evaluate(expL, environment))((valueL) =>
        LOG.flatMap<Value, Value>(evaluate(expR, environment))((valueR) =>
          LOG.unit((valueL as number) + (valueR as number))
        )
      ),
    mul: (
      exp1: Exp<EvaluateResult>,
      exp2: Exp<EvaluateResult>
    ): EvaluateResult =>
      LOG.flatMap<Value, Value>(evaluate(exp1, environment))((value1) =>
        LOG.flatMap<Value, Value>(evaluate(exp2, environment))((value2) =>
          LOG.unit((value1 as number) * (value2 as number))
        )
      ),
  } as Pattern<EvaluateResult>);
