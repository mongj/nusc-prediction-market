-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "session_cookie" TEXT,
    "session_expiry" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants" (
    "user_id" INTEGER NOT NULL,
    "need_password_reset" BOOLEAN NOT NULL DEFAULT true,
    "completed_pre_survey" BOOLEAN NOT NULL DEFAULT false,
    "completed_post_survey" BOOLEAN NOT NULL DEFAULT false,
    "in_control_group" BOOLEAN,
    "coin_balance" INTEGER NOT NULL DEFAULT 200,
    "cash_balance" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "admins" (
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "open_on" TIMESTAMP(3) NOT NULL,
    "close_on" TIMESTAMP(3) NOT NULL,
    "is_closed" BOOLEAN,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "markets" (
    "id" SERIAL NOT NULL,
    "open_on" TIMESTAMP(3) NOT NULL,
    "close_on" TIMESTAMP(3) NOT NULL,
    "is_open" BOOLEAN,
    "is_control" BOOLEAN NOT NULL,

    CONSTRAINT "markets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participant_bets" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "market_id" INTEGER NOT NULL,
    "bet_outcome" BOOLEAN NOT NULL,
    "bet_amount" INTEGER NOT NULL,

    CONSTRAINT "participant_bets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "participants_user_id_key" ON "participants"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_user_id_key" ON "admins"("user_id");

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant_bets" ADD CONSTRAINT "participant_bets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "participants"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant_bets" ADD CONSTRAINT "participant_bets_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
