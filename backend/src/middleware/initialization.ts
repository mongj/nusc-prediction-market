import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { Application } from "express";
import express from "express";
import helmet from "helmet";

import config from "@/config";

import { formatRequest, formatResponse } from "./format";
import { logRequest } from "./logger";

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://nuscpredict.com",
    "https://www.nuscpredict.com",
    "https://nuscpredict.mingjun.dev",
  ],
  credentials: true,
};

const initializeMiddleware = (app: Application) => {
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(cookieParser(config.cookieSecret));
  app.use(cors(corsOptions));
  app.use(logRequest);
  app.use(formatRequest);
  app.use(formatResponse);
};

export { initializeMiddleware };
