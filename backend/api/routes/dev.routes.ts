// Dev-only routes
import { Router } from "express";

import { DevController } from "@/controllers";

const devRouter = Router();
const devController = new DevController();

devRouter.post("/clear-database", devController.clearDatabase);

export default devRouter;
