export const add = (
  n: number,
  m: number,
  continues: (n: number) => number
): number => continues(n + m);
