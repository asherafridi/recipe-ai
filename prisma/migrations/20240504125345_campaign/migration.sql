-- CreateTable
CREATE TABLE "SingleCall" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "callId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "status" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SingleCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaigns" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "agentId" INTEGER NOT NULL,
    "contacts" TEXT NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "status" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Campaigns_pkey" PRIMARY KEY ("id")
);
