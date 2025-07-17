import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Request, Response } from "express";

import config from "@/config";
import { db, logger } from "@/services";

export class AuthController {
  private static readonly SESSION_COOKIE = "session";
  private static readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  public signIn = async (req: Request, res: Response) => {
    const { friendly_id, password } = req.body;

    try {
      // Find user by friendly_id
      const user = await db.user.findUnique({
        where: { friendly_id },
        include: {
          Participant: true,
        },
      });

      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      // Generate session
      const { sessionToken, sessionExpiry } = await this.renewSession(user);

      // Set session cookie
      await this.setSessionCookie(res, sessionToken, sessionExpiry);

      // Return user info (excluding sensitive data)
      const { password_hash, session_cookie, session_expiry, ...userInfo } = user;
      res.status(200).json({
        // data: userInfo,
        data: {
          id: user.id,
          friendly_id: user.friendly_id,
          is_admin: user.is_admin,  // Explicitly include
          Participant: user.Participant, // Optional: include if needed
        },
      });
    } catch (error) {
      logger.error("Error during sign in:", error as Error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public signOut = async (req: Request, res: Response) => {
    try {
      const user = req.user;

      if (!user) {
        res.status(401).json({ message: "Invalid session" });
        return;
      }

      // Clear session in database
      await this.clearDbSession(user);
      // Clear session cookie
      await this.clearSessionCookie(res);
      res.status(200).json({ message: "Signed out successfully" });
    } catch (error) {
      logger.error("Error during sign out:", error as Error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public resetPassword = async (req: Request, res: Response) => {
    const { friendly_id, current_password, new_password } = req.body;

    try {
      // Find user by friendly_id
      const user = await db.user.findUnique({
        where: { friendly_id },
      });

      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(current_password, user.password_hash);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(new_password, 10);

      // Update password
      await db.user.update({
        where: { id: user.id },
        data: {
          password_hash: hashedPassword,
        },
      });

      // Renew session
      const { sessionToken, sessionExpiry } = await this.renewSession(user);

      // Set session cookie
      await this.setSessionCookie(res, sessionToken, sessionExpiry);

      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      logger.error("Error resetting password:", error as Error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  private async renewSession(user: User) {
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const sessionExpiry = new Date(Date.now() + AuthController.SESSION_DURATION);

    await db.user.update({
      where: { id: user.id },
      data: { session_cookie: sessionToken, session_expiry: sessionExpiry },
    });

    return { sessionToken, sessionExpiry };
  }

  private async clearDbSession(user: User) {
    await db.user.update({
      where: { id: user.id },
      data: { session_cookie: null, session_expiry: null },
    });
  }

  private async setSessionCookie(res: Response, sessionToken: string, sessionExpiry: Date) {
    res.cookie(AuthController.SESSION_COOKIE, sessionToken, {
      expires: sessionExpiry,
      httpOnly: true,
      secure: config.nodeEnv === "production",
      signed: true,
    });
  }

  private async clearSessionCookie(res: Response) {
    res.clearCookie(AuthController.SESSION_COOKIE);
  }
}
