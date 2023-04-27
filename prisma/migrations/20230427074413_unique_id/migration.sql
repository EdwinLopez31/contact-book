/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "name" SET DEFAULT 'Unknown';

-- CreateIndex
CREATE UNIQUE INDEX "contacts_id_key" ON "contacts"("id");
