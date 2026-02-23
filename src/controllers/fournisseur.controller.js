import { fournisseurService } from '../services/fournisseur.service.js'
import { fournisseurCreateSchema, fournisseurUpdateSchema } from '../validation/fournisseur.schema.js'

export const fournisseurController = {
  getAll: async (req, res, next) => {
    try {
      const data = await fournisseurService.getAll()
      res.json(data)
    } catch (err) { next(err) }
  },

  getById: async (req, res, next) => {
    try {
      const data = await fournisseurService.getById(Number(req.params.id))
      res.json(data)
    } catch (err) { next(err) }
  },

  create: async (req, res, next) => {
    
    try {
      
      const parsed = fournisseurCreateSchema.parse(req.body)
      const data = await fournisseurService.create(parsed)
      res.status(201).json(data)
    } catch (err) { next(err) }
  },

  update: async (req, res, next) => {
    try {
      const parsed = fournisseurUpdateSchema.parse(req.body)
      const data = await fournisseurService.update(Number(req.params.id), parsed)
      res.json(data)
    } catch (err) { next(err) }
  },

  delete: async (req, res, next) => {
    try {
      await fournisseurService.delete(Number(req.params.id))
      res.status(204).send()
    } catch (err) { next(err) }
  }
}