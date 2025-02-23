import { Request, Response } from "express";

import { db } from "@/services";

export class UserController {
  public async list(req: Request, res: Response) {
    const users = await db.user.findMany({
      include: {
        Participant: true,
      },
    });

    res.status(200).json({ data: users });
  }

  public async getById(req: Request, res: Response) {
    const userId = Number(req.params.id);

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        Participant: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ data: user });
  }

  public async createParticipant(req: Request, res: Response) {
    const { email, password_hash, in_control_group } = req.body;

    try {
      const participant = await db.user.create({
        data: {
          email,
          password_hash,
          Participant: {
            create: {
              in_control_group,
            },
          },
        },
        include: {
          Participant: true,
        },
      });

      res.status(201).json({ data: participant });
    } catch (error) {
      console.error("Error creating participant:", error);
      res.status(500).json({ message: "Failed to create participant" });
    }
  }

  public async update(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const { email, password_hash } = req.body;

    const user = await db.user.update({
      where: { id: userId },
      data: {
        email,
        password_hash,
      },
      include: {
        Participant: true,
      },
    });

    res.status(200).json({ data: user });
  }

  public async delete(req: Request, res: Response) {
    const userId = Number(req.params.id);

    // First delete related records due to foreign key constraints
    await db.$transaction([
      db.participant.deleteMany({ where: { user_id: userId } }),
      db.user.delete({ where: { id: userId } }),
    ]);

    res.status(200).json({ message: "User deleted successfully" });
  }
}
