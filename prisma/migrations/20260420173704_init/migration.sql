-- CreateTable
CREATE TABLE "LunchResponse" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slackId" TEXT NOT NULL,
    "slackName" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "lunchDate" TEXT NOT NULL,

    CONSTRAINT "LunchResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slackId" TEXT NOT NULL,
    "slackName" TEXT NOT NULL,
    "lunchDate" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LunchResponse_slackId_lunchDate_key" ON "LunchResponse"("slackId", "lunchDate");
