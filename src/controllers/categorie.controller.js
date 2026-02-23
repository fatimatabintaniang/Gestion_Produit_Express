import { categorieService } from '../services/categorie.service.js'
import { categorieCreateSchema, categorieUpdateSchema } from '../validation/categorie.schema.js'

export const categorieController = {
  getAll: async (req, res, next) => {
    try {
      const data = await categorieService.getAll()
      res.json(data)
    } catch (err) { next(err) }
  },

  getById: async (req, res, next) => {
    try {
      const data = await categorieService.getById(Number(req.params.id))
      res.json(data)
    } catch (err) { next(err) }
  },

  create: async (req, res, next) => {
    try {
      const parsed = categorieCreateSchema.parse(req.body)
      const data = await categorieService.create(parsed)
      res.status(201).json(data)
    } catch (err) { next(err) }
  },

  update: async (req, res, next) => {
    try {
      const parsed = categorieUpdateSchema.parse(req.body)
      const data = await categorieService.update(Number(req.params.id), parsed)
      res.json(data)
    } catch (err) { next(err) }
  },

  delete: async (req, res, next) => {
    try {
      await categorieService.delete(Number(req.params.id))
      res.status(204).send()
    } catch (err) { next(err) }
  }
}