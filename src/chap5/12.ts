export type Pattern<T, R> = {
  empty: () => R;
  cons: (value: T, list: List<T>) => R;
};

export type List<T> = <R>(pattern: Pattern<T, R>) => R;

export const empty = <T>(): List<T> => {
  return <R>(pattern: Pattern<T, R>) => {
    return pattern.empty();
  };
};

export const cons = <T>(value: T, list: List<T>): List<T> => {
  return <R>(pattern: Pattern<T, R>) => {
    return pattern.cons(value, list);
  };
};

export const match = <T, R>(data: List<T>, pattern: Pattern<T, R>) => {
  return data(pattern);
};

export const isEmpty = <T>(alist: List<T>): boolean => {
  return match(alist, {
    empty: () => true,
    cons: (head, tail) => false,
  });
};

export const head = <T>(alist: List<T>): T | null => {
  return match(alist, {
    empty: () => null,
    cons: (head, tail) => head,
  });
};

export const tail = <T>(alist: List<T>): List<T> | null => {
  return match(alist, {
    empty: () => null,
    cons: (head, tail) => tail,
  });
};
