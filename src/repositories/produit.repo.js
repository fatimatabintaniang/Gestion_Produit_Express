import { createBaseRepository } from './base.repo.js'
import prisma from '../config/db.js'

const include = { categorie: true, fournisseur: true }
const base = createBaseRepository('produit', include)

export const produitRepository = {
  ...base,
  findByLibelle: (libelle) => prisma.produit.findUnique({ where: { libelle } })
}