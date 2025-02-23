import type { NextFunction, Request, Response } from "express";

import { db } from "@/services";

const requireUniqueFriendlyId = async (req: Request, res: Response, next: NextFunction) => {
  const { friendly_id } = req.body;
  const existingFriendlyId = await db.user.findUnique({
    where: { friendly_id },
  });

  if (existingFriendlyId) {
    res.status(400).json({ message: "Friendly ID already in use" });
    return;
  }

  next();
};

export { requireUniqueFriendlyId };
