import { fournisseurRepository } from '../repositories/fournisseur.repo.js'

export const fournisseurService = {
  getAll: async () => {
    return await fournisseurRepository.findAll()
  },

  getById: async (id) => {
    const fournisseur = await fournisseurRepository.findById(id)
    if (!fournisseur) throw { status: 404, message: 'Fournisseur non trouvé' }
    return fournisseur
  },

  create: async (data) => {
    const existingEmail = await fournisseurRepository.findByEmail(data.email)
    if (existingEmail) throw { status: 400, message: 'Cet email est déjà utilisé' }

    const existingTel = await fournisseurRepository.findByTelephone(data.telephone)
    if (existingTel) throw { status: 400, message: 'Ce téléphone est déjà utilisé' }

    return await fournisseurRepository.create(data)
  },

  update: async (id, data) => {
    await fournisseurService.getById(id)

    if (data.email) {
      const existingEmail = await fournisseurRepository.findByEmail(data.email)
      if (existingEmail && existingEmail.id !== id)
        throw { status: 400, message: 'Cet email est déjà utilisé' }
    }

    if (data.telephone) {
      const existingTel = await fournisseurRepository.findByTelephone(data.telephone)
      if (existingTel && existingTel.id !== id)
        throw { status: 400, message: 'Ce téléphone est déjà utilisé' }
    }

    return await fournisseurRepository.update(id, data)
  },

  delete: async (id) => {
    await fournisseurService.getById(id)
    await fournisseurRepository.delete(id)
  }
}