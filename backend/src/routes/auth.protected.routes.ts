import { Router } from "express";

import { AuthController } from "@/controllers";

const authProtectedRouter = Router();
const authController = new AuthController();

// Protected routes
authProtectedRouter.post("/auth/signout", authController.signOut);

export default authProtectedRouter;
