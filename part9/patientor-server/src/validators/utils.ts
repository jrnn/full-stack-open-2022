export const isNumber = (n?: unknown): n is number => {
  return !!n && typeof n === "number";
};

export const isString = (s?: unknown): s is string => {
  return !!s && typeof s === "string";
};

export const isArray = (a?: unknown): a is Array<unknown> => {
  return Array.isArray(a);
};

export const isPropertyValue = <E extends Record<string, string>>(e: E, s: string): s is E[keyof E] => {
  return Object.values(e).includes(s);
};

export const validateNumber = (key: string, value?: unknown): number => {
  if (isNumber(value)) {
    return value;
  }
  throw new Error(`Mandatory attribute '${key}' is either missing or invalid. Must be a number.`);
};

export const validateString = (key: string, value?: unknown): string => {
  if (isString(value)) {
    return value;
  }
  throw new Error(`Mandatory attribute '${key}' is either missing or invalid. Must be a string.`);
};
