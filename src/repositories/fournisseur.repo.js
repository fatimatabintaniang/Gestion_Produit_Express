import prisma from '../config/db.js'

export const fournisseurRepository = {
  findAll: () => prisma.fournisseur.findMany(),

  findById: (id) => prisma.fournisseur.findUnique({ where: { id } }),

  findByEmail: (email) => prisma.fournisseur.findUnique({ where: { email } }),

  findByTelephone: (telephone) => prisma.fournisseur.findUnique({ where: { telephone } }),

  create: (data) => prisma.fournisseur.create({ data }),

  update: (id, data) => prisma.fournisseur.update({ where: { id }, data }),

  delete: (id) => prisma.fournisseur.delete({ where: { id } })
}