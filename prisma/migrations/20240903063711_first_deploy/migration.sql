-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "subaccount_id" TEXT,
    "subaccount_key" TEXT,
    "verificationToken" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "number" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "agentType" TEXT,
    "voice" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "numberId" TEXT,
    "firstSentence" TEXT,
    "waitForGreeting" TEXT DEFAULT 'false',
    "maxDuration" TEXT DEFAULT '1',
    "transferNumber" TEXT,
    "language" TEXT DEFAULT 'ENG',
    "model" TEXT DEFAULT 'enhanced',
    "userId" INTEGER NOT NULL,
    "tools" TEXT,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
