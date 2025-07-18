import { Application, Router } from "express";

import config from "@/config";
import { formatRequest, requireAdmin, requireAuth } from "@/middleware";

import authProtectedRouter from "./auth.protected.routes";
import authPublicRouter from "./auth.public.routes";
import devRouter from "./dev.routes";
import marketRouter from "./market.routes";
import pingRouter from "./ping.routes";
import surveyRouter from "./survey.routes";
import userRouter from "./user.routes";
import adminRouter from "./admin.routes";
import webhookRouter from "./webhooks.routes";

const initializeRoutes = (app: Application) => {
  // This router will handle requests that should NOT be formatted, like the webhook.
  const unformattedRouter = Router();
  unformattedRouter.use("/", pingRouter);
  unformattedRouter.use("/webhooks", webhookRouter);

  // This router will handle requests that DO need camelCase to snake_case conversion.
  const formattedRouter = Router();
  formattedRouter.use(formatRequest); // Apply middleware only to this router
  formattedRouter.use("/", authPublicRouter);
  formattedRouter.use(requireAuth); // All subsequent routes are protected
  formattedRouter.use("/", authProtectedRouter);
  formattedRouter.use("/", userRouter);
  formattedRouter.use("/", surveyRouter);
  formattedRouter.use("/", marketRouter);
  formattedRouter.use("/admin", requireAdmin, adminRouter);

  // Mount the routers with the /api prefix
  app.use("/api", unformattedRouter);
  app.use("/api", formattedRouter);

  // Add dev router in development environment
  if (config.nodeEnv === "development") {
    app.use("/dev", devRouter);
  }
};

export { initializeRoutes };