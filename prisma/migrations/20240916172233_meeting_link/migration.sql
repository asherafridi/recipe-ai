-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "meeting_link" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL;
