import { fournisseurRepository } from '../repositories/fournisseur.repo.js'
import { findOrFail, checkUnique } from '../utils/service.helpers.js'

export const fournisseurService = {
  getAll: () => fournisseurRepository.findAll(),

  getById: (id) => findOrFail(fournisseurRepository, id, 'Fournisseur'),

  create: async (data) => {
    await checkUnique(fournisseurRepository.findByEmail, data.email, 'Cet email est déjà utilisé')
    await checkUnique(fournisseurRepository.findByTelephone, data.telephone, 'Ce téléphone est déjà utilisé')
    return fournisseurRepository.create(data)
  },

  update: async (id, data) => {
    await findOrFail(fournisseurRepository, id, 'Fournisseur')
    if (data.email)
      await checkUnique(fournisseurRepository.findByEmail, data.email, 'Cet email est déjà utilisé', id)
    if (data.telephone)
      await checkUnique(fournisseurRepository.findByTelephone, data.telephone, 'Ce téléphone est déjà utilisé', id)
    return fournisseurRepository.update(id, data)
  },

  delete: async (id) => {
    await findOrFail(fournisseurRepository, id, 'Fournisseur')
    return fournisseurRepository.delete(id)
  }
}