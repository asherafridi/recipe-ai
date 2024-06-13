/*
  Warnings:

  - You are about to drop the column `balance` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "firstSentence" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "maxDuration" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "transferNumber" TEXT,
ADD COLUMN     "waitForGreeting" TEXT,
ALTER COLUMN "agentType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "balance",
ADD COLUMN     "subaccount_id" TEXT,
ADD COLUMN     "subaccount_key" TEXT;
