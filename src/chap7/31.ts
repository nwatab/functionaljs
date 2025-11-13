export const object = {
  empty: (key: string) => null,
  set:
    <T>(key: string, value: T) =>
    (obj: (key: string) => T | null) =>
    (queryKey: string): T | null =>
      key === queryKey ? value : object.get(queryKey)(obj),
  get:
    (key: string) =>
    <T>(obj: (key: string) => T | null): T | null =>
      obj(key),
};
