import { NextFunction, Request, Response } from "express";

import { db, logger } from "@/services";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.signedCookies["session"];

  if (!sessionToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const user = await db.user.findFirst({
      where: {
        session_cookie: sessionToken,
        session_expiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      res.clearCookie("session");
      res.status(401).json({ message: "Invalid or expired session" });
      return;
    }

    logger.debug("User object attached to req.user in requireAuth:", user);

    // Add user to request object for use in route handlers
    req.user = user;
    next();
  } catch (e) {
    logger.error("Auth middleware error:", e as Error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  logger.debug("Checking for admin privileges in requireAdmin. User:", user);

  if (!user || !user.is_admin) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  next();
};

export { requireAdmin, requireAuth };
