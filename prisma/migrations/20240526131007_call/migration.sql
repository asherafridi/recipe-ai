/*
  Warnings:

  - You are about to drop the column `cost` on the `SingleCall` table. All the data in the column will be lost.
  - You are about to drop the column `maxDuration` on the `SingleCall` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `SingleCall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SingleCall" DROP COLUMN "cost",
DROP COLUMN "maxDuration",
DROP COLUMN "status";
