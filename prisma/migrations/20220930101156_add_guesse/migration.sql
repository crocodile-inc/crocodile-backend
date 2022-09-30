-- CreateTable
CREATE TABLE "Guesse" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "guesse" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Guesse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Guesse" ADD CONSTRAINT "Guesse_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
