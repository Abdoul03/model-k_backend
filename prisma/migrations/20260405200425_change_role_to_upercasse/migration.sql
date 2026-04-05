/*
  Warnings:

  - The values [Admin,Client] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'CLIENT');
ALTER TABLE "public"."Utilisateur" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Utilisateur" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "Utilisateur" ALTER COLUMN "role" SET DEFAULT 'CLIENT';
COMMIT;

-- AlterTable
ALTER TABLE "Utilisateur" ALTER COLUMN "role" SET DEFAULT 'CLIENT';
