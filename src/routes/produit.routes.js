import { Router } from 'express'
import { produitController } from '../controllers/produit.controller.js'

export const produitRoutes = Router()

produitRoutes.get('/',       produitController.getAll)
produitRoutes.get('/:id',    produitController.getById)
produitRoutes.post('/',      produitController.create)
produitRoutes.patch('/:id',  produitController.update)
produitRoutes.delete('/:id', produitController.delete)