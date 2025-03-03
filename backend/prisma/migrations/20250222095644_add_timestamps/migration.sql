/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `markets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `participant_bets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `surveys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "session_expiry" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "markets" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "open_on" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "close_on" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "participant_bets" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "participants" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "surveys" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "open_on" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "close_on" SET DATA TYPE TIMESTAMPTZ;
