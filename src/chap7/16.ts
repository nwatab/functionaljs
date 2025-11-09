export const compose =
  <S, T, U>(f: (arg: T) => U, g: (arg: S) => T) =>
  (arg: S) =>
    f(g(arg));
