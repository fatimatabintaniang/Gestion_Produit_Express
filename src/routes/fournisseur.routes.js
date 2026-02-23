import { Router } from 'express'
import { fournisseurController } from '../controllers/fournisseur.controller.js'

export const fournisseurRoutes = Router()

fournisseurRoutes.get('/',       fournisseurController.getAll)
fournisseurRoutes.get('/:id',    fournisseurController.getById)
fournisseurRoutes.post('/',      fournisseurController.create)
fournisseurRoutes.patch('/:id',  fournisseurController.update)
fournisseurRoutes.delete('/:id', fournisseurController.delete)