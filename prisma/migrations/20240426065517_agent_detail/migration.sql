-- CreateTable
CREATE TABLE "AgentNumber" (
    "id" SERIAL NOT NULL,
    "number" TEXT,
    "purchaseId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AgentNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "agentType" TEXT NOT NULL,
    "voice" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "numberId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);
