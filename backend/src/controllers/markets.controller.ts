import { Request, Response } from "express";

import { db } from "@/services";

export class MarketController {
  public async list(req: Request, res: Response) {
    const markets = await db.market.findMany({
      include: {
        bets: true,
      },
    });
    res.status(200).json({ data: markets });
  }

  public async getById(req: Request, res: Response) {
    const marketId = Number(req.params.id);

    const market = await db.market.findUnique({
      where: { id: marketId },
      include: {
        bets: true,
      },
    });

    if (!market) {
      res.status(404).json({ message: "Market not found" });
      return;
    }

    res.status(200).json({ data: market });
  }

  public async create(req: Request, res: Response) {
    const { open_on, close_on, is_control } = req.body;

    try {
      const market = await db.market.create({
        data: {
          open_on: new Date(open_on),
          close_on: new Date(close_on),
          is_control,
          is_open: false,
        },
      });

      res.status(201).json({ data: market });
    } catch (error) {
      console.error("Error creating market:", error);
      res.status(500).json({ message: "Failed to create market" });
    }
  }

  public async update(req: Request, res: Response) {
    const marketId = Number(req.params.id);
    const { open_on, close_on, is_open, is_control } = req.body;

    try {
      const market = await db.market.update({
        where: { id: marketId },
        data: {
          open_on: open_on ? new Date(open_on) : undefined,
          close_on: close_on ? new Date(close_on) : undefined,
          is_open,
          is_control,
        },
      });

      res.status(200).json({ data: market });
    } catch (error) {
      console.error("Error updating market:", error);
      res.status(500).json({ message: "Failed to update market" });
    }
  }

  public async delete(req: Request, res: Response) {
    const marketId = Number(req.params.id);

    try {
      await db.market.delete({
        where: { id: marketId },
      });

      res.status(200).json({ message: "Market deleted successfully" });
    } catch (error) {
      console.error("Error deleting market:", error);
      res.status(500).json({ message: "Failed to delete market" });
    }
  }

  public async placeBet(req: Request, res: Response) {
    const marketId = Number(req.params.id);
    const { user_id, bet_outcome, bet_amount } = req.body;

    try {
      // First check if the market is open
      const market = await db.market.findUnique({
        where: { id: marketId },
      });

      if (!market) {
        res.status(404).json({ message: "Market not found" });
        return;
      }

      if (!market.is_open) {
        res.status(400).json({ message: "Market is not open for betting" });
        return;
      }

      // Check if participant has enough coins
      const participant = await db.participant.findUnique({
        where: { user_id },
      });

      if (!participant) {
        res.status(404).json({ message: "Participant not found" });
        return;
      }

      if (participant.coin_balance < bet_amount) {
        res.status(400).json({ message: "Insufficient coin balance" });
        return;
      }

      // Create bet and update participant's balance in a transaction
      const bet = await db.$transaction([
        db.participantBet.create({
          data: {
            user_id,
            market_id: marketId,
            bet_outcome,
            bet_amount,
          },
        }),
        db.participant.update({
          where: { user_id },
          data: {
            coin_balance: participant.coin_balance - bet_amount,
          },
        }),
      ]);

      res.status(201).json({ data: bet[0] });
    } catch (error) {
      console.error("Error placing bet:", error);
      res.status(500).json({ message: "Failed to place bet" });
    }
  }
}
