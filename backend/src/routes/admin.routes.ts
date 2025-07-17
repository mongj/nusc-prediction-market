import { Router } from "express";
import { AdminController } from "@/controllers"

const adminRouter = Router();
const adminController = new AdminController();

// Admin dashboard route
adminRouter.get("/", adminController.dashboard);

export default adminRouter;