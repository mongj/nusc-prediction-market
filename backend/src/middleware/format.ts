import type { NextFunction, Request, Response } from "express";

import { keysToCamelCase, keysToSnakeCase, serializeDates } from "@/util";

const formatRequest = (req: Request, res: Response, next: NextFunction) => {
  // Bypass this middleware for the Qualtrics webhook to avoid unintended transformations
  if (req.originalUrl === "/api/webhooks/qualtrics") {
    return next();
  }

  if (req.body && typeof req.body === "object") {
    req.body = keysToSnakeCase(req.body);
  }
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
