import type { NextFunction, Request, Response } from "express";

import { db } from "@/services";

const requireUniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const existingEmail = await db.user.findUnique({
    where: { email },
  });

  if (existingEmail) {
    res.status(400).json({ message: "Email already in use" });
    return;
  }

  next();
};

export { requireUniqueEmail };
