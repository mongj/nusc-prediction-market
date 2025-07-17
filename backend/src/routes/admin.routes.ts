import { Router } from "express";
import { requireAdmin } from "@/middleware";
import { AdminController } from "@/controllers"

const adminRouter = Router();
const adminController = new AdminController();

// All routes here are protected by admin middleware
adminRouter.use(requireAdmin);

// Admin dashboard route
adminRouter.get("/", adminController.dashboard);

export default adminRouter;