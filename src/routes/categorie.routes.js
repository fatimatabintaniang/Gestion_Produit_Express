
import { validate } from '../middlewares/validate.js'
import { categorieCreateSchema, categorieUpdateSchema } from '../validation/categorie.schema.js'
import { categorieController } from '../controllers/categorie.controller.js'
import { Router } from 'express'

const router = Router()
router.get('/', categorieController.getAll)
router.get('/:id', categorieController.getById)
router.post('/', validate(categorieCreateSchema), categorieController.create)
router.put('/:id', validate(categorieUpdateSchema), categorieController.update)
router.delete('/:id', categorieController.delete)
export default router