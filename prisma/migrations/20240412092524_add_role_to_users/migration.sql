-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'KARYAWAN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'KARYAWAN';
