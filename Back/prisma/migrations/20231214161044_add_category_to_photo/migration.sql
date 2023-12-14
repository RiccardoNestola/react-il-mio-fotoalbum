/*
  Warnings:

  - You are about to drop the `_CategoriaToFoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CategoriaToFoto` DROP FOREIGN KEY `_CategoriaToFoto_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoriaToFoto` DROP FOREIGN KEY `_CategoriaToFoto_B_fkey`;

-- DropTable
DROP TABLE `_CategoriaToFoto`;

-- CreateTable
CREATE TABLE `_FotoToCategoria` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FotoToCategoria_AB_unique`(`A`, `B`),
    INDEX `_FotoToCategoria_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FotoToCategoria` ADD CONSTRAINT `_FotoToCategoria_A_fkey` FOREIGN KEY (`A`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FotoToCategoria` ADD CONSTRAINT `_FotoToCategoria_B_fkey` FOREIGN KEY (`B`) REFERENCES `Foto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
