import { createCrudController } from '../utils/crud.controller.js'
import { categorieService } from '../services/categorie.service.js'

export const categorieController = createCrudController(categorieService)