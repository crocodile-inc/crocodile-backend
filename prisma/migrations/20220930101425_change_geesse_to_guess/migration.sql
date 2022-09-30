/*
  Warnings:

  - You are about to drop the column `guesse` on the `Guesse` table. All the data in the column will be lost.
  - Added the required column `guess` to the `Guesse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guesse" DROP COLUMN "guesse",
ADD COLUMN     "guess" TEXT NOT NULL;
