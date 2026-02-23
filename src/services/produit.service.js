import { produitRepository } from '../repositories/produit.repo.js'
import { categorieService } from './categorie.service.js'
import { fournisseurService } from './fournisseur.service.js'

export const produitService = {
  getAll: async () => {
    return await produitRepository.findAll()
  },

  getById: async (id) => {
    const produit = await produitRepository.findById(id)
    if (!produit) throw { status: 404, message: 'Produit non trouvé' }
    return produit
  },

  create: async (data) => {
    const existing = await produitRepository.findByLibelle(data.libelle)
    if (existing) throw { status: 400, message: 'Ce libellé existe déjà' }

    await categorieService.getById(data.categoryId)
    await fournisseurService.getById(data.fournisseurId)

    return await produitRepository.create(data)
  },

  update: async (id, data) => {
    await produitService.getById(id)

    if (data.libelle) {
      const existing = await produitRepository.findByLibelle(data.libelle)
      if (existing && existing.id !== id)
        throw { status: 400, message: 'Ce libellé existe déjà' }
    }

    if (data.categoryId) await categorieService.getById(data.categoryId)
    if (data.fournisseurId) await fournisseurService.getById(data.fournisseurId)

    return await produitRepository.update(id, data)
  },

  delete: async (id) => {
    await produitService.getById(id)
    await produitRepository.delete(id)
  }
}