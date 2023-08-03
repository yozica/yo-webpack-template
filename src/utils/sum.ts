export const sum: (...args: number[]) => number = (...args) => {
  return args.reduce((p, c) => p + c, 0);
};
