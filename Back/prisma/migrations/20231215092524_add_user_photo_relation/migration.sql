/*
  Warnings:

  - Added the required column `userId` to the `Foto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Foto` ADD COLUMN `userId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Foto` ADD CONSTRAINT `Foto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
