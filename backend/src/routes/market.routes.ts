import { Router } from "express";

import { MarketController } from "@/controllers";
import { requireAdmin } from "@/middleware";

const marketRouter = Router();
const marketController = new MarketController();

// Admin routes - specific routes must come before parameterized ones
marketRouter.get("/markets/admin", requireAdmin, marketController.listAdmin);
marketRouter.post("/markets", requireAdmin, marketController.create);
marketRouter.put("/markets/:id", requireAdmin, marketController.update);

// Protected routes
marketRouter.get("/markets", marketController.list);
marketRouter.get("/markets/:id", marketController.getById);
marketRouter.post("/markets/:id/bets", marketController.placeBet);
marketRouter.post("/markets/:id/resolve", requireAdmin, marketController.resolve);

export default marketRouter;