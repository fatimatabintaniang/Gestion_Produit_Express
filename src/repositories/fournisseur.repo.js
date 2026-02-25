import { createBaseRepository } from './base.repo.js'
import prisma from '../config/db.js'

const base = createBaseRepository('fournisseur')

export const fournisseurRepository = {
  ...base,
  findByEmail: (email) => prisma.fournisseur.findUnique({ where: { email } }),
  findByTelephone: (telephone) => prisma.fournisseur.findUnique({ where: { telephone } })
}