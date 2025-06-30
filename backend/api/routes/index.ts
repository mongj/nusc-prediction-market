import { Application, Router } from "express";

import config from "@/config";
import { requireAuth } from "@/middleware/auth";

import authProtectedRouter from "./auth.protected.routes";
import authPublicRouter from "./auth.public.routes";
import devRouter from "./dev.routes";
import marketRouter from "./market.routes";
import pingRouter from "./ping.routes";
import surveyRouter from "./survey.routes";
import userRouter from "./user.routes";

const initializeRoutes = (app: Application) => {
  const publicRouter = Router();
  publicRouter.use("/", pingRouter);
  publicRouter.use("/", authPublicRouter);

  const protectedRouter = Router();
  protectedRouter.use(requireAuth);
  protectedRouter.use("/", authProtectedRouter);
  protectedRouter.use("/", userRouter);
  protectedRouter.use("/", surveyRouter);
  protectedRouter.use("/", marketRouter);

  // Mount routers
  if (config.nodeEnv === "development") {
    app.use("/", devRouter);
  }
  app.use("/", publicRouter);
  app.use("/", protectedRouter);
};

export { initializeRoutes };
