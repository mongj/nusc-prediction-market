import compression from "compression";
import cookieParser from "cookie-parser";
import type { Application } from "express";
import express from "express";
import helmet from "helmet";

const initializeMiddleware = (app: Application) => {
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(cookieParser());
};

export { initializeMiddleware };
