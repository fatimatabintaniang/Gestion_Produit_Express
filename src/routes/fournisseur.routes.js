import { validate } from '../middlewares/validate.js'
import { fournisseurCreateSchema, fournisseurUpdateSchema } from '../validation/fournisseur.schema.js'
import { fournisseurController } from '../controllers/fournisseur.controller.js'
import { Router } from 'express'

const router = Router()
router.get('/', fournisseurController.getAll)
router.get('/:id', fournisseurController.getById)
router.post('/', validate(fournisseurCreateSchema), fournisseurController.create)
router.patch('/:id', validate(fournisseurUpdateSchema), fournisseurController.update)
router.delete('/:id', fournisseurController.delete)
export default router