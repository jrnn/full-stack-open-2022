export const assertNever = (_: never): never => {
  throw new Error(""
    + "In a dream world, this error will never be thrown. "
    + "So, if you see this error, it means you're living in a nightmare world.");
};

export const isEmptyObject = <O extends Record<string | number, unknown>>(o: O): boolean => {
  return !o || Object.keys(o).length === 0;
};
