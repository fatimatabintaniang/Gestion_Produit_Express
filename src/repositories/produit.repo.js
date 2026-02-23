import prisma from '../config/db.js'

export const produitRepository = {
  findAll: () => prisma.produit.findMany({
    include: { categorie: true, fournisseur: true }
  }),

  findById: (id) => prisma.produit.findUnique({
    where: { id },
    include: { categorie: true, fournisseur: true }
  }),

  findByLibelle: (libelle) => prisma.produit.findUnique({ where: { libelle } }),

  create: (data) => prisma.produit.create({
    data,
    include: { categorie: true, fournisseur: true }
  }),

  update: (id, data) => prisma.produit.update({
    where: { id },
    data,
    include: { categorie: true, fournisseur: true }
  }),

  delete: (id) => prisma.produit.delete({ where: { id } })
}