export type Exp<T> = (pattern: Pattern<T>) => T;

export interface Pattern<T> {
  num?: (value: number) => T;
  variable?: (name: string) => T;
  lambda?: (variable: Exp<string>, body: Exp<T>) => T;
  app?: (lambda: Exp<T>, arg: Exp<T>) => T;
  add?: (expL: Exp<T>, expR: Exp<T>) => T;
}

export const exp = {
  match: <T>(data: Exp<T>, pattern: Pattern<T>): T => data(pattern),
  num:
    (value: number): Exp<number> =>
    (pattern) =>
      pattern.num!(value),
  variable:
    <T>(name: string): Exp<T> =>
    (pattern) =>
      pattern.variable!(name),
  lambda:
    (variable: Exp<string>, body: Exp<any>): Exp<any> =>
    (pattern) =>
      pattern.lambda!(variable, body),
  app:
    (lambda: Exp<any>, arg: Exp<any>): Exp<any> =>
    (pattern) =>
      pattern.app!(lambda, arg),
  add:
    (expL: Exp<number>, expR: Exp<number>): Exp<number> =>
    (pattern) =>
      pattern.add!(expL, expR),
};
