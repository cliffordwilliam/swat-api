/*
  Warnings:

  - Made the column `ongkir` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "harga" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "totalPembelian" SET DEFAULT 0,
ALTER COLUMN "ongkir" SET NOT NULL,
ALTER COLUMN "ongkir" SET DEFAULT 0,
ALTER COLUMN "grandTotal" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
