import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

import config from "@/config";
import { db, logger } from "@/services";

export class DevController {
  public async clearDatabase(req: Request, res: Response) {
    // Safety check - only allow in development
    if (config.nodeEnv !== "development") {
      logger.error("Attempted to clear database in non-development environment");
      res.status(403).json({ message: "Not allowed in this environment" });
      return;
    }

    try {
      // Get all table names from the database
      const tables = await db.$queryRaw<{ tablename: string }[]>`
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
      `;

      // Disable foreign key checks, truncate all tables, then re-enable checks
      await db.$transaction([
        // Disable foreign key checks
        db.$executeRaw`SET CONSTRAINTS ALL DEFERRED`,

        // Truncate all tables
        ...tables.map(({ tablename }) => db.$executeRaw(Prisma.sql`TRUNCATE TABLE "${tablename}" CASCADE`)),

        // Re-enable foreign key checks
        db.$executeRaw`SET CONSTRAINTS ALL IMMEDIATE`,
      ]);

      logger.success("Database cleared successfully");
      res.status(200).json({
        message: "Database cleared successfully",
        tables: tables.map((t) => t.tablename),
      });
    } catch (error) {
      logger.error("Error clearing database:", error as Error);
      res.status(500).json({ message: "Failed to clear database" });
    }
  }
}
