import { Router } from "express";

import { AuthController } from "@/controllers";

const authPublicRouter = Router();
const authController = new AuthController();

authPublicRouter.post("/auth/signin", authController.signIn);

export default authPublicRouter;
