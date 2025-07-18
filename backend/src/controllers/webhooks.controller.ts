import { Request, Response } from "express";

import { db, logger } from "@/services";

export class WebhookController {
  public async handleQualtricsResponse(req: Request, res: Response) {
    // The request body is now in camelCase because we are bypassing the formatRequest middleware.
    const { friendlyId, surveyId } = req.body;

    if (!friendlyId || !surveyId) {
      logger.warn("Webhook received with missing friendlyId or surveyId", { body: req.body });
      return res.status(400).json({ message: "Missing friendlyId or surveyId from Qualtrics." });
    }

    try {
      const user = await db.user.findUnique({
        where: { friendly_id: friendlyId },
      });

      if (!user) {
        logger.warn(`Webhook: User with friendlyId '${friendlyId}' not found.`);
        return res.status(404).json({ message: `User with friendlyId '${friendlyId}' not found.` });
      }

      const participant = await db.participant.findUnique({
        where: { user_id: user.id },
      });

      if (!participant) {
        logger.warn(`Webhook: Participant record not found for user '${friendlyId}'.`);
        return res.status(404).json({ message: `Participant record not found for user '${friendlyId}'.` });
      }

      const survey = await db.survey.findUnique({
        where: { qualtrics_id: surveyId },
      });

      if (!survey) {
        logger.warn(`Webhook: Survey with qualtrics_id '${surveyId}' not found.`);
        return res.status(404).json({ message: `Survey with qualtrics_id '${surveyId}' not found.` });
      }

      let updateData = {};
      if (survey.name.toLowerCase().includes("pre-study")) {
        updateData = { completed_pre_survey: true };
      } else if (survey.name.toLowerCase().includes("post-study")) {
        updateData = { completed_post_survey: true };
      } else {
        logger.warn(`Webhook received for unhandled survey: ${survey.name} (ID: ${survey.id})`);
        return res.status(200).json({ message: "Webhook received for unhandled survey, no action taken." });
      }

      await db.participant.update({
        where: { user_id: user.id },
        data: updateData,
      });

      logger.info(`Successfully updated participant ${friendlyId} for survey ${surveyId}`);
      res.status(200).json({ message: "Participant survey status updated successfully." });
    } catch (error) {
      logger.error("Error handling Qualtrics webhook:", error as Error);
      res.status(500).json({ message: "Internal server error while processing webhook." });
    }
  }
}