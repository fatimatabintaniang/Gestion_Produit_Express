import prisma from '../config/db.js'

export const categorieRepository = {
  findAll: () => prisma.categorie.findMany(),

  findById: (id) => prisma.categorie.findUnique({ where: { id } }),

  findByLibelle: (libelle) => prisma.categorie.findFirst({ where: { libelle } }),

  create: (data) => prisma.categorie.create({ data }),

  update: (id, data) => prisma.categorie.update({ where: { id }, data }),

  delete: (id) => prisma.categorie.delete({ where: { id } })
}