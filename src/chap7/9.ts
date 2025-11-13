type ChurchNumeral = <T>(f: (arg: T) => T) => (x: T) => T;

export const zero: ChurchNumeral =
  <T>(f: (arg: T) => T) =>
  (x: T): T =>
    x;

export const one: ChurchNumeral =
  <T>(f: (arg: T) => T) =>
  (x: T): T =>
    f(x);

export const two: ChurchNumeral =
  <T>(f: (arg: T) => T) =>
  (x: T): T =>
    f(f(x));

export const three: ChurchNumeral =
  <T>(f: (arg: T) => T) =>
  (x: T): T =>
    f(f(f(x)));

export const add =
  <T>(m: ChurchNumeral) =>
  (n: ChurchNumeral) =>
  (f: (arg: T) => T) =>
  (x: T) =>
    m(f)(n(f)(x));

export const succ =
  (n: (f: (arg: number) => number) => (x: number) => number) =>
  (f: (arg: number) => number) =>
  (x: number): number =>
    f(n(f)(x));
