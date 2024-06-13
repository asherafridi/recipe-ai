/*
  Warnings:

  - You are about to drop the `AgentNumber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_numberId_fkey";

-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "numberId" DROP NOT NULL,
ALTER COLUMN "numberId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "AgentNumber";
