/*
  Warnings:

  - Added the required column `tenueId` to the `OptionCustomisation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prixUnitaire` to the `Tenue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OptionCustomisation" ADD COLUMN     "tenueId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tenue" ADD COLUMN     "prixUnitaire" INTEGER NOT NULL,
ADD COLUMN     "quantite" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "OptionCustomisation" ADD CONSTRAINT "OptionCustomisation_tenueId_fkey" FOREIGN KEY ("tenueId") REFERENCES "Tenue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
