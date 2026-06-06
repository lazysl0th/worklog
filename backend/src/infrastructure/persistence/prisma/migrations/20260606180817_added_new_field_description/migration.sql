/*
  Warnings:

  - A unique constraint covering the columns `[full_name]` on the table `contractors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `work_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "work_logs" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contractors_full_name_key" ON "contractors"("full_name");
