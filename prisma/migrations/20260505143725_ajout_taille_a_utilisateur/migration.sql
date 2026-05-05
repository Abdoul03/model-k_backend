/*
  Warnings:

  - You are about to drop the column `taille` on the `Mesure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mesure" DROP COLUMN "taille";

-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "taille" DOUBLE PRECISION;
