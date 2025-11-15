type IdentityMonad = {
  unit: <T>(value: T) => T;
  flatMap: <T>(instanceM: T) => <U>(transform: (value: T) => U) => U;
  compose: <T, U, V>(f: (x: T) => U, g: (y: U) => V) => (x: T) => V;
};

export const ID: IdentityMonad = {
  unit: <T>(value: T): T => value,
  flatMap:
    <T>(instanceM: T) =>
    <U>(transform: (value: T) => U): U =>
      transform(instanceM),
  compose:
    <T, U, V>(f: (x: T) => U, g: (y: U) => V) =>
    (x: T): V =>
      ID.flatMap(f(x))(g),
};
