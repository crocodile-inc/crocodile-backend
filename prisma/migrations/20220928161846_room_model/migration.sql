/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `Picture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "roomId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_id_key" ON "Room"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Picture_roomId_key" ON "Picture"("roomId");

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
