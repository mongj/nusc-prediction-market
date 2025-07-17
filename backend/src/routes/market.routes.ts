import { Router } from "express";

import { MarketController } from "@/controllers";
import { requireAdmin } from "@/middleware";

const marketRouter = Router();
const marketController = new MarketController();

// Protected routes
marketRouter.get("/markets", marketController.list);
marketRouter.get("/markets/admin", marketController.listAdmin);
marketRouter.get("/markets/:id", marketController.getById);
marketRouter.post("/markets/:id/bets", marketController.placeBet);

// Admin routes
marketRouter.post("/markets", requireAdmin, marketController.create);
marketRouter.put("/markets/:id", requireAdmin, marketController.update);
marketRouter.delete("/markets/:id", requireAdmin, marketController.delete);
marketRouter.post("/markets/:id/resolve", requireAdmin, marketController.resolve);

export default marketRouter;
