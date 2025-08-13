import type { NextFunction, Request, Response } from "express";

import { keysToCamelCase, keysToSnakeCase, serializeDates } from "@/util";

const formatRequest = (req: Request, res: Response, next: NextFunction) => {
  req.body = keysToSnakeCase(req.body);
  next();
};

const formatResponse = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (body) {
    const formattedBody = keysToCamelCase(serializeDates(body));
    return originalJson.call(this, formattedBody);
  };

  next();
};

export { formatRequest, formatResponse };
