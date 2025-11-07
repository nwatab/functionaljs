export const infiniteLoop: () => any = () => infiniteLoop();

export const conditional = (n: number) => {
  if (n === 1) return true;
  return infiniteLoop();
};
