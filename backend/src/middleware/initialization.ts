import compression from "compression";
import cookieParser from "cookie-parser";
import type { Application } from "express";
import express from "express";
import helmet from "helmet";

import config from "@/config";

import { formatRequest, formatResponse } from "./format";
import { logRequest } from "./logger";

const initializeMiddleware = (app: Application) => {
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(cookieParser(config.cookieSecret));
  app.use(logRequest);
  app.use(formatRequest);
  app.use(formatResponse);
};

export { initializeMiddleware };
