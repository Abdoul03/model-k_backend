/*
  Warnings:

  - You are about to drop the column `tenueId` on the `OptionCustomisation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OptionCustomisation" DROP CONSTRAINT "OptionCustomisation_tenueId_fkey";

-- AlterTable
ALTER TABLE "Model" ALTER COLUMN "tissusId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OptionCustomisation" DROP COLUMN "tenueId";

-- CreateTable
CREATE TABLE "OptionChoisie" (
    "id" SERIAL NOT NULL,
    "tenueId" INTEGER NOT NULL,
    "optionCustomisationId" INTEGER NOT NULL,

    CONSTRAINT "OptionChoisie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OptionChoisie" ADD CONSTRAINT "OptionChoisie_tenueId_fkey" FOREIGN KEY ("tenueId") REFERENCES "Tenue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionChoisie" ADD CONSTRAINT "OptionChoisie_optionCustomisationId_fkey" FOREIGN KEY ("optionCustomisationId") REFERENCES "OptionCustomisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
