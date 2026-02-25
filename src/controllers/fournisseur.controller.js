import { createCrudController } from '../utils/crud.controller.js'
import { fournisseurService } from '../services/fournisseur.service.js'

export const fournisseurController = createCrudController(fournisseurService)