/*
  Warnings:

  - You are about to drop the column `analytics_access_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `analytics_refresh_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `property_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "analytics_access_token",
DROP COLUMN "analytics_refresh_token",
DROP COLUMN "property_id";

-- CreateTable
CREATE TABLE "Favourite" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "recipe" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
