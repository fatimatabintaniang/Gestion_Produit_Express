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
      const parsed = produitCreateSchema.parse(req.body)
      const data = await produitService.create(parsed)
      res.status(201).json(data)
    } catch (err) { next(err) }
  },

  update: async (req, res, next) => {
    try {
      const parsed = produitUpdateSchema.parse(req.body)
      const data = await produitService.update(Number(req.params.id), parsed)
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