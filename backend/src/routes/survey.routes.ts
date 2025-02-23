import { Router } from "express";

import { SurveyController } from "@/controllers";
import { requireAdmin } from "@/middleware";

const surveyRouter = Router();
const surveyController = new SurveyController();

// Protected routes
surveyRouter.get("/surveys", surveyController.list);
surveyRouter.get("/surveys/:id", surveyController.getById);

// Admin routes
surveyRouter.post("/surveys", requireAdmin, surveyController.create);
surveyRouter.put("/surveys/:id", requireAdmin, surveyController.update);
surveyRouter.delete("/surveys/:id", requireAdmin, surveyController.delete);

export default surveyRouter;
