import { cons, empty } from './12';

type Pattern<T, R> = {
  num: (n: T) => R;
  add: (left: Data<T>, right: Data<T>) => R;
  mul: (left: Data<T>, right: Data<T>) => R;
};

type Data<T> = <R>(pattern: Pattern<T, R>) => R;

export const num = <T>(n: T) => {
  return <R>(pattern: Pattern<T, R>) => pattern.num(n);
};

export const add = <T>(left: Data<T>, right: Data<T>) => {
  return <R>(pattern: Pattern<T, R>) => pattern.add(left, right);
};

export const mul = <T>(left: Data<T>, right: Data<T>) => {
  return <R>(pattern: Pattern<T, R>) => pattern.mul(left, right);
};

const match = <T, R>(data: Data<T>, pattern: Pattern<T, R>) => {
  return data(pattern);
};

export const calculate = (exp: Data<number>): number => {
  return match(exp, {
    num: (n) => n,
    add: (left, right) => calculate(left) + calculate(right),
    mul: (left, right) => calculate(left) * calculate(right),
  });
};
