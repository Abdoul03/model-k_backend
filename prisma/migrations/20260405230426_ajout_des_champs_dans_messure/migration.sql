/*
  Warnings:

  - Added the required column `poignet` to the `Mesure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ventre` to the `Mesure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mesure" ADD COLUMN     "poignet" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ventre" DOUBLE PRECISION NOT NULL;
