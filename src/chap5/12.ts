export type Pattern<T, R> = {
  empty: () => R;
  cons: (value: T, list: Data<T>) => R;
};

export type Data<T> = <R>(pattern: Pattern<T, R>) => R;

export const empty = <T>(): Data<T> => {
  return <R>(pattern: Pattern<T, R>) => {
    return pattern.empty();
  };
};

export const cons = <T>(value: T, list: Data<T>): Data<T> => {
  return <R>(pattern: Pattern<T, R>) => {
    return pattern.cons(value, list);
  };
};

export const match = <T, R>(data: Data<T>, pattern: Pattern<T, R>) => {
  return data(pattern);
};

export const isEmpty = <T>(alist: Data<T>): boolean => {
  return match(alist, {
    empty: () => true,
    cons: (head, tail) => false,
  });
};

export const head = <T>(alist: Data<T>): T | null => {
  return match(alist, {
    empty: () => null,
    cons: (head, tail) => head,
  });
};

export const tail = <T>(alist: Data<T>): Data<T> | null => {
  return match(alist, {
    empty: () => null,
    cons: (head, tail) => tail,
  });
};
