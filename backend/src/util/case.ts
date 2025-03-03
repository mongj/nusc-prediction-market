import { camelCase, snakeCase } from "lodash";

import { deepMapKeys } from "./helpers";

const keysToCamelCase = (obj: object): object => deepMapKeys(obj, camelCase);
const keysToSnakeCase = (obj: object): object => deepMapKeys(obj, snakeCase);

export { keysToCamelCase, keysToSnakeCase };
