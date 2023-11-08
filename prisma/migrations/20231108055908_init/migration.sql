-- DropForeignKey
ALTER TABLE `MenuItem` DROP FOREIGN KEY `MenuItem_parentId_fkey`;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `MenuItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
