import { Request, Response } from "express";

import { db } from "@/services";

export class SurveyController {
  public async list(req: Request, res: Response) {
    const surveys = await db.survey.findMany();
    res.status(200).json({ data: surveys });
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
}
