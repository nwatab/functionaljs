import { ID } from '../chap7/85';
import { exp, Exp } from './2';
import { Environment, env } from './5';

export const evaluate = (anExp: Exp<any>, environment: Environment): any =>
  exp.match(anExp, {
    num: (numericValue: number) => ID.unit(numericValue),
    variable: (name: string) => ID.unit(env.lookup(name, environment)),
    lambda: (variable, body) =>
      exp.match(variable, {
        variable: (name: string) =>
          ID.unit((actualArg: any) =>
            evaluate(body, env.extend(name, actualArg, environment))
          ) as any,
      }),
    app: (lambda, arg) =>
      ID.flatMap(evaluate(lambda, environment))((closure: any) =>
        ID.flatMap(evaluate(arg, environment))((actualArg: any) =>
          closure(actualArg)
        )
      ),
    add: (expL, expR) =>
      ID.flatMap(evaluate(expL, environment))((valueL: any) =>
        ID.flatMap(evaluate(expR, environment))((valueR: any) =>
          ID.unit(valueL + valueR)
        )
      ),
  });
