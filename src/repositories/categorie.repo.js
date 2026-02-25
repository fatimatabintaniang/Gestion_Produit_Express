import { createBaseRepository } from './base.repo.js'
import prisma from '../config/db.js'

const base = createBaseRepository('categorie')

export const categorieRepository = {
  ...base,
  findByLibelle: (libelle) => prisma.categorie.findFirst({ where: { libelle } })
}