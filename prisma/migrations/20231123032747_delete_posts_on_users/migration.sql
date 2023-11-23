/*
  Warnings:

  - You are about to drop the `PostsOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PostsOnUsers` DROP FOREIGN KEY `PostsOnUsers_postId_fkey`;

-- DropForeignKey
ALTER TABLE `PostsOnUsers` DROP FOREIGN KEY `PostsOnUsers_userId_fkey`;

-- DropTable
DROP TABLE `PostsOnUsers`;
