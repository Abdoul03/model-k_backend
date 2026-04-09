/*
  Warnings:

  - You are about to drop the column `monbreDeMetres` on the `Tissus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "nombreDeMetre" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tissus" DROP COLUMN "monbreDeMetres";
