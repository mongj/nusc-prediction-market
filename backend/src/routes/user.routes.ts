import { Router } from "express";

import { UserController } from "@/controllers";
import { requireAdmin, requireUniqueFriendlyId } from "@/middleware";

const userRouter = Router();
const userController = new UserController();

// Protected routes
userRouter.get("/users", userController.list);
userRouter.get("/users/:id", userController.getById);

// Admin routes
userRouter.post("/participants", requireAdmin, requireUniqueFriendlyId, userController.createParticipant);
userRouter.delete("/users/:id", requireAdmin, userController.delete);

export default userRouter;
