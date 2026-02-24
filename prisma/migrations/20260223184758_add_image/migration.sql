/*
  Warnings:

  - Added the required column `image` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produit" ADD COLUMN     "image" TEXT NOT NULL;
