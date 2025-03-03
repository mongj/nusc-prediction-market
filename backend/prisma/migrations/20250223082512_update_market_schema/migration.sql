/*
  Warnings:

  - Added the required column `name` to the `markets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `markets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "markets" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "resolution" BOOLEAN;
