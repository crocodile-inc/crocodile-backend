-- DropForeignKey
ALTER TABLE "Guess" DROP CONSTRAINT "Guess_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Stroke" DROP CONSTRAINT "Stroke_pictureId_fkey";

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stroke" ADD CONSTRAINT "Stroke_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
