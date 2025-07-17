import { Router } from "express";

import { UserController } from "@/controllers";
import { requireAdmin, requireUniqueFriendlyId } from "@/middleware";

const userRouter = Router();
const userController = new UserController();

// Protected routes
userRouter.get("/users", requireAdmin, userController.list);
userRouter.get("/users/coins", userController.getCoins);

// Admin routes
userRouter.post("/participants", requireAdmin, requireUniqueFriendlyId, userController.createParticipant);
userRouter.post("/users/:id/reset-password", requireAdmin, userController.adminResetPassword);
userRouter.delete("/users/:id", requireAdmin, userController.delete);

export default userRouter;
