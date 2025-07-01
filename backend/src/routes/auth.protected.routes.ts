import { Router } from "express";

import { AuthController } from "@/controllers";

const authProtectedRouter = Router();
const authController = new AuthController();

// Protected routes
authProtectedRouter.post("/auth/signout", authController.signOut);
authProtectedRouter.post("/auth/reset-password", authController.resetPassword);

export default authProtectedRouter;
