import { Request, Response } from "express";

import { db } from "@/services";

export class WebhookController {
  public async handleQualtricsResponse(req: Request, res: Response) {
    const { friendly_id, qualtrics_id } = req.body;

    if (!friendly_id || !qualtrics_id) {
      return res.status(400).json({ message: "Missing friendly_id or qualtrics_id from Qualtrics." });
    }

    try {
      // Step 1 & 2: Find the user by friendly_id to get their user.id
      const user = await db.user.findUnique({
        where: { friendly_id },
      });

      if (!user) {
        return res.status(400).json({ message: `User with friendly_id '${friendly_id}' not found.` });
      }

      // Step 3: Verify a participant record exists for this user.id
      const participant = await db.participant.findUnique({
        where: { user_id: user.id },
      });

      if (!participant) {
        return res.status(400).json({ message: `Participant record not found for user '${friendly_id}'.` });
      }

      const survey = await db.survey.findUnique({
        where: { qualtrics_id },
      });

      if (!survey) {
        return res.status(400).json({ message: `Survey with qualtrics_id '${qualtrics_id}' not found.` });
      }

      let updateData = {};
      if (survey.name.toLowerCase().includes("pre-study")) {
        updateData = { completed_pre_survey: true };
      } else if (survey.name.toLowerCase().includes("post-study")) {
        updateData = { completed_post_survey: true };
      } else {
        console.warn(`Webhook received for unhandled survey: ${survey.name} (ID: ${survey.id})`);
        return res.status(400).json({ message: "Webhook received for unhandled survey." });
      }

      // Step 4: Update the participant record using the user.id
      await db.participant.update({
        where: { user_id: user.id },
        data: updateData,
      });

      // Step 5: Update the survey response record using the survey_id
      const surveyResponse = await db.surveyResponse.findFirst({
        where: { survey_id: survey.id, participant_id: participant.user_id },
      });

      if (!surveyResponse) {
        await db.surveyResponse.create({
          data: {
            survey_id: survey.id,
            participant_id: participant.user_id,
          },
        });
      }

      res.status(200).json({ message: "Participant survey status updated successfully." });
    } catch (error) {
      console.error("Error handling Qualtrics webhook:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}
