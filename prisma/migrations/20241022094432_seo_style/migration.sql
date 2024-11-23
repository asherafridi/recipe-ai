/*
  Warnings:

  - You are about to drop the column `appointmentEmailTemplate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ghlCalenderId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ghlToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `smtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `smtpType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subaccount_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subaccount_key` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Agent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Appointments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_userId_fkey";

-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_userId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- DropForeignKey
ALTER TABLE "ContactGroup" DROP CONSTRAINT "ContactGroup_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "appointmentEmailTemplate",
DROP COLUMN "ghlCalenderId",
DROP COLUMN "ghlToken",
DROP COLUMN "smtp",
DROP COLUMN "smtpType",
DROP COLUMN "subaccount_id",
DROP COLUMN "subaccount_key",
DROP COLUMN "verificationToken";

-- DropTable
DROP TABLE "Agent";

-- DropTable
DROP TABLE "Appointments";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "ContactGroup";
