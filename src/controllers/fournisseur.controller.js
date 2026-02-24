import { fournisseurService } from '../services/fournisseur.service.js'
import { fournisseurCreateSchema, fournisseurUpdateSchema } from '../validation/fournisseur.schema.js'

export const fournisseurController = {
  getAll: async (req, res) => {
    try {
      const fournisseurs = await fournisseurService.getAll()
      res.json(fournisseurs)
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message })
    }
  },

  getById: async (req, res) => {
    try {
      const fournisseur = await fournisseurService.getById(Number(req.params.id))
      res.json(fournisseur)
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message })
    }
  },

  create: async (req, res) => {
    try {
      const result = fournisseurCreateSchema.safeParse(req.body)
      if (!result.success) {
        return res.status(400).json({ errors: result.error.flatten().fieldErrors })
      }

      const fournisseur = await fournisseurService.create(result.data)
      res.status(201).json(fournisseur)
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message })
    }
  },

  update: async (req, res) => {
    try {
      const result = fournisseurUpdateSchema.safeParse(req.body)
      if (!result.success) {
        return res.status(400).json({ errors: result.error.flatten().fieldErrors })
      }

      const fournisseur = await fournisseurService.update(Number(req.params.id), result.data)
      res.json(fournisseur)
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message })
    }
  },

  delete: async (req, res) => {
    try {
      await fournisseurService.delete(Number(req.params.id))
      res.status(204).send()
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message })
    }
  }
}