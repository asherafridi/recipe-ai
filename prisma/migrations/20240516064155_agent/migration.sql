-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_numberId_fkey" FOREIGN KEY ("numberId") REFERENCES "AgentNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
