export const succ = (n: number, continues: (n: number) => number): number =>
  continues(n + 1);

export const identity = <T>(x: T): T => x;
