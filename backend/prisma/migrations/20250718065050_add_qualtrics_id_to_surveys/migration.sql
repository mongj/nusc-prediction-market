/*
  Warnings:

  - A unique constraint covering the columns `[qualtrics_id]` on the table `surveys` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "surveys" ADD COLUMN     "qualtrics_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "surveys_qualtrics_id_key" ON "surveys"("qualtrics_id");
