/*
  Warnings:

  - The values [manuelle,ai_generation] on the enum `TypeMesure` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeMesure_new" AS ENUM ('Manuelle', 'Ai_generation');
ALTER TABLE "Mesure" ALTER COLUMN "status" TYPE "TypeMesure_new" USING ("status"::text::"TypeMesure_new");
ALTER TYPE "TypeMesure" RENAME TO "TypeMesure_old";
ALTER TYPE "TypeMesure_new" RENAME TO "TypeMesure";
DROP TYPE "public"."TypeMesure_old";
COMMIT;

-- AlterTable
ALTER TABLE "Mesure" ALTER COLUMN "status" SET DEFAULT 'Manuelle';
