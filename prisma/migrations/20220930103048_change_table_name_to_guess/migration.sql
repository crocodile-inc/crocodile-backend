/*
  Warnings:

  - You are about to drop the `Guesse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Guesse" DROP CONSTRAINT "Guesse_roomId_fkey";

-- DropTable
DROP TABLE "Guesse";

-- CreateTable
CREATE TABLE "Guess" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "guess" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Guess_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
