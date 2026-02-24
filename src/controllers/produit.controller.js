import { produitService } from '../services/produit.service.js'
import { produitCreateSchema, produitUpdateSchema } from '../validation/produit.schema.js'

export const produitController = {
  getAll: async (req, res, next) => {
    try {
      const data = await produitService.getAll()
      res.json(data)
    } catch (err) { next(err) }
  },

  getById: async (req, res, next) => {
    try {
      const data = await produitService.getById(Number(req.params.id))
      res.json(data)
    } catch (err) { next(err) }
  },

   create: async (req, res, next) => {
    try {
      // Les champs texte viennent de req.body, le fichier de req.file
      const body = {
        ...req.body,
        qte: Number(req.body.qte),
        prix: Number(req.body.prix),
        categoryId: Number(req.body.categoryId),
        fournisseurId: Number(req.body.fournisseurId),
      }

      const parsed = produitCreateSchema.safeParse(body)
      if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.flatten().fieldErrors })
      }

      if (!req.file) {
        return res.status(400).json({ errors: { image: ["L'image est obligatoire"] } })
      }

      const data = await produitService.create(parsed.data, req.file)
      res.status(201).json(data)
    } catch (err) { next(err) }
  },

  update: async (req, res, next) => {
    try {
      const body = {
        ...req.body,
        ...(req.body.qte && { qte: Number(req.body.qte) }),
        ...(req.body.prix && { prix: Number(req.body.prix) }),
        ...(req.body.categoryId && { categoryId: Number(req.body.categoryId) }),
        ...(req.body.fournisseurId && { fournisseurId: Number(req.body.fournisseurId) }),
      }

      const parsed = produitUpdateSchema.safeParse(body)
      if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.flatten().fieldErrors })
      }

      const data = await produitService.update(Number(req.params.id), parsed.data, req.file)
      res.json(data)
    } catch (err) { next(err) }
  },


  delete: async (req, res, next) => {
    try {
      await produitService.delete(Number(req.params.id))
      res.status(204).send()
    } catch (err) { next(err) }
  }
}