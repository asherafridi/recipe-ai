/*
  Warnings:

  - You are about to drop the `Campaigns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SingleCall` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Campaigns" DROP CONSTRAINT "Campaigns_agentId_fkey";

-- DropForeignKey
ALTER TABLE "SingleCall" DROP CONSTRAINT "SingleCall_agentId_fkey";

-- DropForeignKey
ALTER TABLE "SingleCall" DROP CONSTRAINT "SingleCall_contactId_fkey";

-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "tools" TEXT;

-- DropTable
DROP TABLE "Campaigns";

-- DropTable
DROP TABLE "SingleCall";
