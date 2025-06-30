import { isObject } from "lodash";

const deepMapKeys = (obj: object, fn: (key: string) => string): object => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [fn(key), isObject(value) ? deepMapKeys(value, fn) : value])
  );
};

const deepMapValues = (obj: object, fn: (value: any) => any): object => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, isObject(value) ? deepMapValues(value, fn) : fn(value)])
  );
};

export { deepMapKeys, deepMapValues };
