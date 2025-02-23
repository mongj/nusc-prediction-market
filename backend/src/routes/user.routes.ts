import { Router } from "express";

import { UserController } from "@/controllers";
import { requireAdmin, requireUniqueEmail } from "@/middleware";

const userRouter = Router();
const userController = new UserController();

// Protected routes
userRouter.get("/users", userController.list);
userRouter.get("/users/:id", userController.getById);
userRouter.put("/users/:id", userController.update);

// Admin routes
userRouter.post("/participants", requireAdmin, requireUniqueEmail, userController.createParticipant);
userRouter.delete("/users/:id", requireAdmin, userController.delete);

export default userRouter;
