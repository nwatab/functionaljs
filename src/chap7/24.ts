export const Y = <T>(F: (f: (...args: any[]) => T) => (...args: any[]) => T) =>
  ((x: any) => F((y: any) => x(x)(y)))((x: any) => F((y: any) => x(x)(y)));

export const factorial = Y<number>(
  (fact) => (n) => (n === 0 ? 1 : n * fact(n - 1))
);
