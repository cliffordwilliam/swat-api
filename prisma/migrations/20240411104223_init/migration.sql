-- CreateEnum
CREATE TYPE "PickupDelivery" AS ENUM ('PICKUP', 'DELIVERY', 'GOJEK', 'CITYTRAN', 'PAXEL', 'DAYTRANS', 'BARAYA', 'LINTAS', 'BINEKA', 'JNE');

-- CreateEnum
CREATE TYPE "Pembayaran" AS ENUM ('TUNAI', 'KARTU_KREDIT', 'QR', 'TRANSFER');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "tanggalOrder" TIMESTAMP(3) NOT NULL,
    "pembeliId" INTEGER NOT NULL,
    "tanggalKirim" TIMESTAMP(3) NOT NULL,
    "namaPenerima" TEXT NOT NULL,
    "alamatPenerima" TEXT NOT NULL,
    "noHpPenerima" TEXT NOT NULL,
    "jamKirim" TEXT NOT NULL,
    "totalPembelian" DOUBLE PRECISION NOT NULL,
    "pickupDelivery" "PickupDelivery" NOT NULL,
    "ongkir" DOUBLE PRECISION,
    "grandTotal" DOUBLE PRECISION NOT NULL,
    "pembayaran" "Pembayaran" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembeli" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pembeli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "sizes" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToOrder_AB_unique" ON "_ItemToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToOrder_B_index" ON "_ItemToOrder"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_pembeliId_fkey" FOREIGN KEY ("pembeliId") REFERENCES "Pembeli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD CONSTRAINT "_ItemToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD CONSTRAINT "_ItemToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
