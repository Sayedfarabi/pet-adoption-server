-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "type" TEXT;
