/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[friendly_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendly_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
ADD COLUMN     "friendly_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_friendly_id_key" ON "users"("friendly_id");
