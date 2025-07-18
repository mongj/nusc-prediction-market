import { Router } from "express";

import { WebhookController } from "@/controllers/webhooks.controller";

const webhookRouter = Router();
const webhookController = new WebhookController();

webhookRouter.post("/qualtrics", webhookController.handleQualtricsResponse);

export default webhookRouter;