import bcrypt from "bcrypt";
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

  public async getCoins(req: Request, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const participant = await db.participant.findUnique({
      where: { user_id: userId },
    });

    if (!participant) {
      res.status(404).json({ message: "Participant not found" });
      return;
    }

    res.status(200).json({ data: participant.coin_balance });
  }

  public async createParticipant(req: Request, res: Response) {
    const { friendly_id, password, in_control_group } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const participant = await db.user.create({
        data: {
          friendly_id,
          password_hash: hashedPassword,
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

  public async delete(req: Request, res: Response) {
    const userId = Number(req.params.id);

    await db.$transaction([
      db.participant.delete({ where: { user_id: userId } }),
      db.user.delete({ where: { id: userId } }),
    ]);

    res.status(200).json({ message: "User deleted successfully" });
  }
}
