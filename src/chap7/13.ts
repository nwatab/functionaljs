export const not =
  <T>(predicate: (arg: T) => boolean) =>
  (arg: T): boolean =>
    !predicate(arg);
