import { Request, Response } from "express";

import { db } from "@/services";

export class SurveyController {
  public async list(req: Request, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const surveys = await db.survey.findMany({
      include: {
        SurveyResponse: {
          where: {
            participant_id: userId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    const surveysWithCompletion = surveys.map((survey) => ({
      ...survey,
      completed: survey.SurveyResponse.length > 0,
      SurveyResponse: undefined,
    }));

    res.status(200).json({ data: surveysWithCompletion });
  }

  public async getById(req: Request, res: Response) {
    const surveyId = Number(req.params.id);

    const survey = await db.survey.findUnique({
      where: { id: surveyId },
    });

    if (!survey) {
      res.status(404).json({ message: "Survey not found" });
      return;
    }

    res.status(200).json({ data: survey });
  }

  public async create(req: Request, res: Response) {
    const { name, link, open_on, close_on } = req.body;

    try {
      const survey = await db.survey.create({
        data: {
          name,
          link,
          open_on: new Date(open_on),
          close_on: new Date(close_on),
          is_closed: false,
        },
      });

      res.status(201).json({ data: survey });
    } catch (error) {
      console.error("Error creating survey:", error);
      res.status(500).json({ message: "Failed to create survey" });
    }
  }

  public async update(req: Request, res: Response) {
    const surveyId = Number(req.params.id);
    const { name, link, open_on, close_on, is_closed } = req.body;

    try {
      const survey = await db.survey.update({
        where: { id: surveyId },
        data: {
          name,
          link,
          open_on: open_on ? new Date(open_on) : undefined,
          close_on: close_on ? new Date(close_on) : undefined,
          is_closed,
        },
      });

      res.status(200).json({ data: survey });
    } catch (error) {
      console.error("Error updating survey:", error);
      res.status(500).json({ message: "Failed to update survey" });
    }
  }

  public async delete(req: Request, res: Response) {
    const surveyId = Number(req.params.id);

    try {
      await db.survey.delete({
        where: { id: surveyId },
      });

      res.status(200).json({ message: "Survey deleted successfully" });
    } catch (error) {
      console.error("Error deleting survey:", error);
      res.status(500).json({ message: "Failed to delete survey" });
    }
  }

  public async createResponse(req: Request, res: Response) {
    const surveyId = Number(req.params.id);
    const { user_id } = req.body;

    if (!user_id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const participant = await db.participant.findUnique({
      where: { user_id },
    });

    if (!participant) {
      res.status(404).json({ message: "Participant not found" });
      return;
    }

    if (isNaN(user_id)) {
      res.status(400).json({ message: "User ID must be a number" });
      return;
    }

    if (isNaN(surveyId)) {
      res.status(400).json({ message: "Survey ID must be a number" });
      return;
    }

    const surveyResponse = await db.surveyResponse.create({
      data: {
        survey_id: surveyId,
        participant_id: user_id,
      },
    });

    res.status(201).json({ data: surveyResponse });
  }
}
