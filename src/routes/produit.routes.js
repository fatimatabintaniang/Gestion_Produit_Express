import { Router } from 'express'
import { produitController } from '../controllers/produit.controller.js'
import { upload } from '../middlewares/upload.middleware.js'

export const produitRoutes = Router()

produitRoutes.get('/',      produitController.getAll)
produitRoutes.get('/:id',   produitController.getById)
produitRoutes.post('/',     upload.single('image'), produitController.create)   
produitRoutes.patch('/:id', upload.single('image'), produitController.update)   
produitRoutes.delete('/:id', produitController.delete)