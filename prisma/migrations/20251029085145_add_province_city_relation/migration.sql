/*
  Warnings:

  - You are about to drop the column `zipCode` on the `assessments` table. All the data in the column will be lost.
  - Added the required column `zip_code` to the `assessments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assessments" DROP COLUMN "zipCode",
ADD COLUMN     "zip_code" TEXT NOT NULL;
