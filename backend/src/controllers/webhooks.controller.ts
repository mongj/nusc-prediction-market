import { Request, Response } from "express";

import { db } from "@/services";

export class WebhookController {
  public async handleQualtricsResponse(req: Request, res: Response) {
    const { friendlyId, surveyId } = req.body;

    if (!friendlyId || !surveyId) {
      return res.status(400).json({ message: "Missing friendlyId or surveyId from Qualtrics." });
    }

    try {
      // Step 1 & 2: Find the user by friendly_id to get their user.id
      const user = await db.user.findUnique({
        where: { friendly_id: friendlyId },
      });

      if (!user) {
        return res.status(404).json({ message: `User with friendlyId '${friendlyId}' not found.` });
      }

      // Step 3: Verify a participant record exists for this user.id
      const participant = await db.participant.findUnique({
        where: { user_id: user.id },
      });

      if (!participant) {
        return res.status(404).json({ message: `Participant record not found for user '${friendlyId}'.` });
      }

      const survey = await db.survey.findUnique({
        where: { qualtrics_id: surveyId },
      });

      if (!survey) {
        return res.status(404).json({ message: `Survey with qualtrics_id '${surveyId}' not found.` });
      }

      let updateData = {};
      if (survey.name.toLowerCase().includes("pre-study")) {
        updateData = { completed_pre_survey: true };
      } else if (survey.name.toLowerCase().includes("post-study")) {
        updateData = { completed_post_survey: true };
      } else {
        console.warn(`Webhook received for unhandled survey: ${survey.name} (ID: ${survey.id})`);
        return res.status(200).json({ message: "Webhook received for unhandled survey." });
      }

      // Step 4: Update the participant record using the user.id
      await db.participant.update({
        where: { user_id: user.id },
        data: updateData,
      });

      res.status(200).json({ message: "Participant survey status updated successfully." });
    } catch (error) {
      console.error("Error handling Qualtrics webhook:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}