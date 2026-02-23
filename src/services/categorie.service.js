import { categorieRepository } from '../repositories/categorie.repo.js'

export const categorieService = {
  getAll: async () => {
    return await categorieRepository.findAll()
  },

  getById: async (id) => {
    const categorie = await categorieRepository.findById(id)
    if (!categorie) throw { status: 404, message: 'Catégorie non trouvée' }
    return categorie
  },

  create: async (data) => {
    const existing = await categorieRepository.findByLibelle(data.libelle)
    if (existing) throw { status: 400, message: 'Ce libellé existe déjà' }
    return await categorieRepository.create(data)
  },

  update: async (id, data) => {
    await categorieService.getById(id) 
    if (data.libelle) {
      const existing = await categorieRepository.findByLibelle(data.libelle)
      if (existing && existing.id !== id)
        throw { status: 400, message: 'Ce libellé existe déjà' }
    }
    return await categorieRepository.update(id, data)
  },

  delete: async (id) => {
    await categorieService.getById(id) 
    await categorieRepository.delete(id)
  }
}