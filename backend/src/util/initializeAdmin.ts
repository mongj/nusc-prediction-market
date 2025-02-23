import bcrypt from "bcrypt";

import config from "@/config";
import { db, logger } from "@/services";

const initializeAdminUser = () => {
  bcrypt.hash(config.adminPassword, 10).then((hashedPassword) => {
    return db.user
      .findUnique({
        where: { friendly_id: config.adminId, is_admin: true },
      })
      .then((existingAdmin) => {
        if (existingAdmin) {
          return db.user
            .update({
              where: { friendly_id: config.adminId },
              data: { password_hash: hashedPassword },
            })
            .then(() => {
              logger.success("Admin password updated");
            });
        } else {
          return db.user
            .create({
              data: {
                friendly_id: config.adminId,
                password_hash: hashedPassword,
                is_admin: true,
              },
            })
            .then(() => {
              logger.success("Admin user created");
            });
        }
      });
  });
};

export { initializeAdminUser };
