/*
  Warnings:

  - You are about to drop the column `name` on the `class_arms` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `school_classes` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `school_sections` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `schools` table. All the data in the column will be lost.
  - Added the required column `arm_name` to the `class_arms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_name` to the `school_classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section_name` to the `school_sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_name` to the `schools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `class_arms` DROP COLUMN `name`,
    ADD COLUMN `arm_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `school_classes` DROP COLUMN `name`,
    ADD COLUMN `class_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `school_sections` DROP COLUMN `name`,
    ADD COLUMN `section_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `schools` DROP COLUMN `name`,
    ADD COLUMN `school_name` VARCHAR(191) NOT NULL;
