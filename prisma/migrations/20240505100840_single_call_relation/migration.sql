-- AddForeignKey
ALTER TABLE "SingleCall" ADD CONSTRAINT "SingleCall_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
