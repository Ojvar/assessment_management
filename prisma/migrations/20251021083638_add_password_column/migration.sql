/*
  Warnings:

  - You are about to drop the `assessments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."assessments" DROP CONSTRAINT "assessments_created_by_fkey";

-- DropTable
DROP TABLE "public"."assessments";

-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "Assessment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "map_points" JSONB,
    "status" "Status" NOT NULL DEFAULT 'draft',
    "reference_code" TEXT,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_reference_code_key" ON "Assessment"("reference_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
