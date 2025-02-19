/*
  Warnings:

  - You are about to drop the column `class_id` on the `school_classes` table. All the data in the column will be lost.
  - Added the required column `section_id` to the `school_classes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `school_classes` DROP FOREIGN KEY `school_classes_class_id_fkey`;

-- DropIndex
DROP INDEX `school_classes_class_id_fkey` ON `school_classes`;

-- AlterTable
ALTER TABLE `school_classes` DROP COLUMN `class_id`,
    ADD COLUMN `section_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `school_classes` ADD CONSTRAINT `school_classes_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `school_sections`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
