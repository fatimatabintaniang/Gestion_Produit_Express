/*
  Warnings:

  - A unique constraint covering the columns `[libelle]` on the table `Categorie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telephone]` on the table `Fournisseur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[libelle]` on the table `Produit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Categorie_libelle_key" ON "Categorie"("libelle");

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_telephone_key" ON "Fournisseur"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Produit_libelle_key" ON "Produit"("libelle");
