-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "backgroundColor" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stroke" (
    "id" SERIAL NOT NULL,
    "strokeColor" TEXT NOT NULL,
    "strokeWidth" INTEGER NOT NULL,
    "pictureId" INTEGER NOT NULL,

    CONSTRAINT "Stroke_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point" (
    "id" SERIAL NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "strokeId" INTEGER NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stroke" ADD CONSTRAINT "Stroke_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_strokeId_fkey" FOREIGN KEY ("strokeId") REFERENCES "Stroke"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
