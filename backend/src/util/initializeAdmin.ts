import bcrypt from "bcrypt";

import config from "@/config";
import { db, logger } from "@/services";

const initializeAdminUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash(config.adminPassword, 10);

    // Find if a user with the admin's friendly_id exists.
    const existingUser = await db.user.findUnique({
      where: { friendly_id: config.adminId },
    });

    if (existingUser) {
      // If the user exists, ensure their password and admin status are correct.
      await db.user.update({
        where: { friendly_id: config.adminId },
        data: {
          password_hash: hashedPassword,
          is_admin: true, // This is the critical fix
        },
      });
      logger.success("Admin user found and updated.");
    } else {
      // If no user exists, create a new admin user.
      await db.user.create({
        data: {
          friendly_id: config.adminId,
          password_hash: hashedPassword,
          is_admin: true,
        },
      });
      logger.success("Admin user created successfully.");
    }
  } catch (error) {
    logger.error("❌ Failed to initialize admin user:", error as Error);
    process.exit(1);
  }
};

export { initializeAdminUser };
