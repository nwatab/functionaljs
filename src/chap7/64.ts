export const tarai = (x: number, y: number, z: number): number =>
  x > y ? tarai(tarai(x - 1, y, z), tarai(y - 1, z, x), tarai(z - 1, x, y)) : y;
