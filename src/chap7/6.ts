export const exponential =
  (base: number) =>
  (index: number): number =>
    index === 0 ? 1 : base * exponential(base)(index - 1);
