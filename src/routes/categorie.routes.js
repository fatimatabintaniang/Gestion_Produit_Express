import { Router } from 'express'
import { categorieController } from '../controllers/categorie.controller.js'

export const categorieRoutes = Router()

categorieRoutes.get('/',       categorieController.getAll)
categorieRoutes.get('/:id',    categorieController.getById)
categorieRoutes.post('/',      categorieController.create)
categorieRoutes.patch('/:id',  categorieController.update)
categorieRoutes.delete('/:id', categorieController.delete)