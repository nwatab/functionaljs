import { List } from '../chap5/12';
import { list } from '../chap6/14';

type ContinuesOnSuccess<T> = (
  value: T,
  continuesOnFailure: ContinuesOnFailure<T>
) => T | null;
type ContinuesOnFailure<T> = () => T | null;

export type Pattern<T, R> = {
  num: (n: T) => R;
  add: (exp1: Exp<T>, exp2: Exp<T>) => R;
  amb: (choices: List<Exp<T>>) => R;
};

export type Exp<T> = <R>(pattern: Pattern<T, R>) => R;

type ExpOps = {
  match: <T, R>(anExp: Exp<T>, pattern: Pattern<T, R>) => R;
  num: <T>(n: T) => Exp<T>;
  add: <T>(exp1: Exp<T>, exp2: Exp<T>) => Exp<T>;
  amb: <T>(alist: List<Exp<T>>) => Exp<T>;
};

export const exp: ExpOps = {
  match: (anExp, pattern) => anExp(pattern),
  num: (n) => (pattern) => pattern.num(n),
  add: (exp1, exp2) => (pattern) => pattern.add(exp1, exp2),
  amb: (alist) => (pattern) => pattern.amb(alist),
};

export const calculate = <T>(
  anExp: Exp<T>,
  continuesOnSuccess: ContinuesOnSuccess<T>,
  continuesOnFailure: ContinuesOnFailure<T>,
  addOp: (a: T, b: T) => T
): T | null =>
  exp.match(anExp, {
    num: (n: T) => continuesOnSuccess(n, continuesOnFailure),
    add: (exp1, exp2) =>
      calculate(
        exp1,
        (resultX: T, continuesOnFailureX: ContinuesOnFailure<T>) =>
          calculate(
            exp2,
            (resultY: T, continuesOnFailureY: ContinuesOnFailure<T>) =>
              continuesOnSuccess(addOp(resultX, resultY), continuesOnFailureY),
            continuesOnFailureX,
            addOp
          ),
        continuesOnFailure,
        addOp
      ),
    amb: (choices) => {
      const calculateAmb = (remainingChoices: List<Exp<T>>): T | null =>
        list.match(remainingChoices, {
          empty: () => continuesOnFailure(),
          cons: (head, tail) =>
            calculate(
              head,
              continuesOnSuccess,
              () => calculateAmb(tail),
              addOp
            ),
        });
      return calculateAmb(choices);
    },
  });

export const driver = <T>(expression: Exp<T>, addOp: (a: T, b: T) => T) => {
  let suspendedComputation: ContinuesOnFailure<T> | null = null;
  const continuesOnSuccess: ContinuesOnSuccess<T> = (
    anyValue: T,
    continuesOnFailure: ContinuesOnFailure<T>
  ) => {
    suspendedComputation = continuesOnFailure;
    return anyValue;
  };
  const continuesOnFailure: ContinuesOnFailure<T> = () => {
    return null;
  };

  return () => {
    if (suspendedComputation === null) {
      return calculate(
        expression,
        continuesOnSuccess,
        continuesOnFailure,
        addOp
      );
    } else {
      const computation = suspendedComputation;
      suspendedComputation = null;
      return computation();
    }
  };
};
