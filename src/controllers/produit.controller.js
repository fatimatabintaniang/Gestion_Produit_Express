import { createCrudController } from '../utils/crud.controller.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { produitService } from '../services/produit.service.js'
import { produitCreateSchema, produitUpdateSchema } from '../validation/produit.schema.js'

const base = createCrudController(produitService)

const coerceBody = (body) => ({
  ...body,
  ...(body.qte         && { qte: Number(body.qte) }),
  ...(body.prix        && { prix: Number(body.prix) }),
  ...(body.categoryId  && { categoryId: Number(body.categoryId) }),
  ...(body.fournisseurId && { fournisseurId: Number(body.fournisseurId) }),
})

const validateProduit = (schema, body, res) => {
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    res.status(400).json({ errors: parsed.error.flatten().fieldErrors })
    return null
  }
  return parsed.data
}

export const produitController = {
  ...base,

  create: asyncHandler(async (req, res) => {
    const body = coerceBody({ ...req.body, qte: Number(req.body.qte), prix: Number(req.body.prix), categoryId: Number(req.body.categoryId), fournisseurId: Number(req.body.fournisseurId) })
    const parsed = validateProduit(produitCreateSchema, body, res)
    if (!parsed) return

    if (!req.file) {
      return res.status(400).json({ errors: { image: ["L'image est obligatoire"] } })
    }

    res.status(201).json(await produitService.create(parsed, req.file))
  }),

  update: asyncHandler(async (req, res) => {
    const body = coerceBody(req.body)
    const parsed = validateProduit(produitUpdateSchema, body, res)
    if (!parsed) return

    res.json(await produitService.update(Number(req.params.id), parsed, req.file))
  })
}