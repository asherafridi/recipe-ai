-- AddForeignKey
ALTER TABLE "Campaigns" ADD CONSTRAINT "Campaigns_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
