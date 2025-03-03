import { mapValues } from "lodash-es";

export const dateTransformer = <T extends Record<string, unknown>>(obj: T, dateFields: (keyof T)[]): T => {
  return mapValues(obj, (value, key) => {
    if (dateFields.includes(key as keyof T) && value) {
      return new Date(value as string);
    }
    return value;
  }) as T;
};
