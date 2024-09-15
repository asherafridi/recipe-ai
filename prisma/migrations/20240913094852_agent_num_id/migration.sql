/*
  Warnings:

  - The `maxDuration` column on the `Agent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `waitForGreeting` on table `Agent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "waitForGreeting" SET NOT NULL,
DROP COLUMN "maxDuration",
ADD COLUMN     "maxDuration" INTEGER DEFAULT 1;
