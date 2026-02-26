import { categorieRepository } from '../repositories/categorie.repo.js'
import { findOrFail, checkUnique } from '../utils/service.helpers.js'

export const categorieService = {
  getAll: () => categorieRepository.findAll(),

  getById: (id) => findOrFail(categorieRepository, id, 'Catégorie'),

  create: async (data) => {
    await checkUnique(categorieRepository.findByLibelle, data.libelle, 'Ce libellé existe déjà')
    return categorieRepository.create(data)
  },

  update: async (id, data) => {
    await findOrFail(categorieRepository, id, 'Catégorie')
    if (data.libelle)
      await checkUnique(categorieRepository.findByLibelle, data.libelle, 'Ce libellé existe déjà', id)
    return categorieRepository.update(id, data)
  },

delete: async (id) => {
  await findOrFail(categorieRepository, id, 'Catégorie')

  const productCount = await categorieRepository.hasProducts(id)
  if (productCount > 0) {
    const error = new Error(`Impossible de supprimer : ${productCount} produit(s) sont liés à cette catégorie`)
    error.status = 409
    throw error
  }

  return categorieRepository.delete(id)
}
}