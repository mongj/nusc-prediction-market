/// <reference path="./types/express/index.d.ts" />
import express from "express";

import config from "@/config";
import { initializeMiddleware } from "@/middleware/initialization";
import { initializeRoutes } from "@/routes";
import { logger } from "@/services";
import { initializeAdminUser } from "@/util";

const app = express();

// Initialize the application
try {
  initializeMiddleware(app);
  initializeAdminUser();
  initializeRoutes(app);
} catch (e) {
  // Require that initialization is successful
  logger.fatal("Error during initialization", e as Error);
  process.exit(1);
}

// Start the server
app.listen(config.port, () => {
  console.log(`\n=================================\n`);
  console.log(`        ENV: ${config.nodeEnv.toUpperCase()}\n`);
  console.log(
    `🚀 App listening on the port ${config.port}\n${
      config.nodeEnv === "development" && `     (http://localhost:${config.port})\n`
    }`
  );
  console.log(`=================================\n`);
});

export default app;
