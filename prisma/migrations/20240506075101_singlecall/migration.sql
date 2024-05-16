/*
  Warnings:

  - A unique constraint covering the columns `[callId]` on the table `SingleCall` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SingleCall_callId_key" ON "SingleCall"("callId");
