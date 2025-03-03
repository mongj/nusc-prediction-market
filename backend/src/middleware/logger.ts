import type { NextFunction, Request, Response } from "express";

import { logger } from "@/services";

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Capture response using res.on('finish')
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.debug(`${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage} - ${duration}ms`);
  });

  next();
};

export { logRequest };
