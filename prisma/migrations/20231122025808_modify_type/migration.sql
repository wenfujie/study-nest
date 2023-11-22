/*
  Warnings:

  - You are about to alter the column `author1` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `author1` VARCHAR(50) NULL;
