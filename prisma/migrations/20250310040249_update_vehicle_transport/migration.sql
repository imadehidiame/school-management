/*
  Warnings:

  - You are about to drop the `_TransportToVehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_TransportToVehicle` DROP FOREIGN KEY `_TransportToVehicle_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TransportToVehicle` DROP FOREIGN KEY `_TransportToVehicle_B_fkey`;

-- DropTable
DROP TABLE `_TransportToVehicle`;

-- CreateTable
CREATE TABLE `VehicleTransport` (
    `vehicleId` VARCHAR(191) NOT NULL,
    `transportId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`vehicleId`, `transportId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VehicleTransport` ADD CONSTRAINT `VehicleTransport_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleTransport` ADD CONSTRAINT `VehicleTransport_transportId_fkey` FOREIGN KEY (`transportId`) REFERENCES `Transport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
