import { Request, Response } from "express";

import { db } from "@/services";

export class MarketController {
  public async list(req: Request, res: Response) {
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

    const is_control = participant.in_control_group;

    if (is_control === null) {
      res.status(400).json({ message: "Participant is not in a control group nor a treatment group" });
      return;
    }

    const markets = await db.market.findMany({
      where: {
        is_control,
      },
      include: {
        bets: {
          where: {
            user_id: userId,
          },
        },
      },
    });

    const marketsWithAugmentedFields = markets.map((market) => ({
      ...market,
      hasAnswered: market.bets.length > 0,
      isCorrect:
        market.bets.length === 0 || market.resolution === null
          ? null
          : market.bets[0].bet_outcome === market.resolution,
      bets: undefined,
    }));

    res.status(200).json({ data: marketsWithAugmentedFields });
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
    const { name, question, open_on, close_on, is_control } = req.body;

    try {
      const market = await db.market.create({
        data: {
          name,
          question,
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
    const market_id = Number(req.params.id);
    const user_id = req.user?.id;
    const { bet_outcome, bet_amount } = req.body;

    if (!user_id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const market = await db.market.findUnique({
        where: { id: market_id },
      });

      if (!market) {
        res.status(404).json({ message: "Market not found" });
        return;
      }

      if (market.open_on > new Date() || market.close_on < new Date()) {
        res.status(400).json({ message: "Market is not open for betting" });
        return;
      }

      const participant = await db.participant.findUnique({
        where: { user_id },
      });

      if (!participant) {
        res.status(404).json({ message: "Participant not found" });
        return;
      }

      // Check if participant has enough coins
      if (participant.coin_balance < bet_amount) {
        res.status(400).json({ message: "Insufficient coin balance" });
        return;
      }

      // check if participant has already answered the market
      const existingBet = await db.bet.findFirst({
        where: {
          user_id,
          market_id,
        },
      });

      if (existingBet) {
        res.status(400).json({ message: "Participant has already placed a bet on this market" });
        return;
      }

      // Create bet and update participant's balance in a transaction
      const bet = await db.$transaction([
        db.bet.create({
          data: {
            user_id,
            market_id,
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

      res.status(201).json({ data: bet });
    } catch (error) {
      console.error("Error placing bet:", error);
      res.status(500).json({ message: "Failed to place bet" });
    }
  }
}
