-- AddForeignKey
ALTER TABLE "SingleCall" ADD CONSTRAINT "SingleCall_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
