export const compoundInterest = (a: number, r: number, n: number): number => {
  if (n === 0) return a;
  return compoundInterest(a, r, n - 1) * (1 + r);
};
