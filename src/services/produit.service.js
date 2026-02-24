import { produitRepository } from '../repositories/produit.repo.js'
import { categorieService } from './categorie.service.js'
import { fournisseurService } from './fournisseur.service.js'
import { uploadImage, deleteImage } from '../utils/uploadImage.js'

export const produitService = {
  getAll: async () => {
    return await produitRepository.findAll()
  },

  getById: async (id) => {
    const produit = await produitRepository.findById(id)
    if (!produit) throw { status: 404, message: 'Produit non trouvé' }
    return produit
  },

 create: async (data, file) => {
    const existing = await produitRepository.findByLibelle(data.libelle)
    if (existing) throw { status: 400, message: 'Ce libellé existe déjà' }

    await categorieService.getById(data.categoryId)
    await fournisseurService.getById(data.fournisseurId)

    const imageUrl = await uploadImage(file.buffer, file.mimetype) // ← buffer

    return await produitRepository.create({ ...data, image: imageUrl })
  },

  update: async (id, data, file) => {
    const produit = await produitService.getById(id)

    if (data.libelle) {
      const existing = await produitRepository.findByLibelle(data.libelle)
      if (existing && existing.id !== id)
        throw { status: 400, message: 'Ce libellé existe déjà' }
    }

    if (data.categoryId) await categorieService.getById(data.categoryId)
    if (data.fournisseurId) await fournisseurService.getById(data.fournisseurId)

    if (file) {
      await deleteImage(produit.image)
      data.image = await uploadImage(file.buffer, file.mimetype) // ← buffer
    }

    return await produitRepository.update(id, data)
  },

delete: async (id) => {
  const produit = await produitService.getById(id) 
  await deleteImage(produit.image)
  await produitRepository.delete(id)
}
}