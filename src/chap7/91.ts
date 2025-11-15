type MaybePattern<T, R> = {
  just: (value: T) => R;
  nothing: () => R;
};

export type Maybe<T> = <R>(pattern: MaybePattern<T, R>) => R;

export const maybe = {
  match: <T, R>(maybeValue: Maybe<T>, pattern: MaybePattern<T, R>): R =>
    maybeValue(pattern),
  just:
    <T>(value: T): Maybe<T> =>
    (pattern) =>
      pattern.just(value),
  nothing:
    <T>(): Maybe<T> =>
    (pattern) =>
      pattern.nothing(),
};

export const MAYBE = {
  unit: <T>(value: T): Maybe<T> => maybe.just(value),
  flatMap:
    <T>(maybeValue: Maybe<T>) =>
    <U>(transform: (value: T) => Maybe<U>): Maybe<U> =>
      maybe.match(maybeValue, {
        just: (value) => transform(value),
        nothing: () => maybe.nothing(),
      }),
  getOrElse:
    <T>(maybeValue: Maybe<T>) =>
    <U>(defaultValue: U): T | U =>
      maybe.match<T, T | U>(maybeValue, {
        just: (value) => value,
        nothing: () => defaultValue,
      }),
};
