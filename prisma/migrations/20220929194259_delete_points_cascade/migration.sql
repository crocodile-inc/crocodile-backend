-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_strokeId_fkey";

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_strokeId_fkey" FOREIGN KEY ("strokeId") REFERENCES "Stroke"("id") ON DELETE CASCADE ON UPDATE CASCADE;
