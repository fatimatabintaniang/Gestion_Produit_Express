import { asyncHandler } from './asyncHandler.js'

export const createCrudController = (service) => ({
  getAll: asyncHandler(async (req, res) => {
    res.json(await service.getAll())
  }),

  getById: asyncHandler(async (req, res) => {
    res.json(await service.getById(Number(req.params.id)))
  }),

  create: asyncHandler(async (req, res) => {
    res.status(201).json(await service.create(req.body))
  }),

  update: asyncHandler(async (req, res) => {
    res.json(await service.update(Number(req.params.id), req.body))
  }),

  delete: asyncHandler(async (req, res) => {
    await service.delete(Number(req.params.id))
    res.status(204).send()
  })
})