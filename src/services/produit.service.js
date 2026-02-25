import { produitRepository } from '../repositories/produit.repo.js'
import { categorieService } from './categorie.service.js'
import { fournisseurService } from './fournisseur.service.js'
import { uploadImage, deleteImage } from '../utils/uploadImage.js'
import { findOrFail, checkUnique } from '../utils/service.helpers.js'

export const produitService = {
  getAll: () => produitRepository.findAll(),

  getById: (id) => findOrFail(produitRepository, id, 'Produit'),

  create: async (data, file) => {
    await checkUnique(produitRepository.findByLibelle, data.libelle, 'Ce libellé existe déjà')
    await categorieService.getById(data.categoryId)
    await fournisseurService.getById(data.fournisseurId)

    const image = await uploadImage(file.buffer, file.mimetype)
    return produitRepository.create({ ...data, image })
  },

  update: async (id, data, file) => {
    const produit = await findOrFail(produitRepository, id, 'Produit')

    if (data.libelle)
      await checkUnique(produitRepository.findByLibelle, data.libelle, 'Ce libellé existe déjà', id)
    if (data.categoryId)
      await categorieService.getById(data.categoryId)
    if (data.fournisseurId)
      await fournisseurService.getById(data.fournisseurId)

    if (file) {
      await deleteImage(produit.image)
      data.image = await uploadImage(file.buffer, file.mimetype)
    }

    return produitRepository.update(id, data)
  },

  delete: async (id) => {
    const produit = await findOrFail(produitRepository, id, 'Produit')
    await deleteImage(produit.image)
    return produitRepository.delete(id)
  }
}