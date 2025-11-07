export const lazyMultiply = (funcX: () => number, funcY: () => number) => {
  const x = funcX();
  if (x === 0) {
    return 0;
  }
  return x * funcY();
};
