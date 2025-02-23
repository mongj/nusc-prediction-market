/*
  Warnings:

  - You are about to drop the `participant_bets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "participant_bets" DROP CONSTRAINT "participant_bets_market_id_fkey";

-- DropForeignKey
ALTER TABLE "participant_bets" DROP CONSTRAINT "participant_bets_user_id_fkey";

-- DropTable
DROP TABLE "participant_bets";

-- CreateTable
CREATE TABLE "bets" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "market_id" INTEGER NOT NULL,
    "bet_outcome" BOOLEAN NOT NULL,
    "bet_amount" INTEGER NOT NULL,
    "bet_resolution" BOOLEAN,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "participants"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
