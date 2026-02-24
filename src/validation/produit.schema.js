import { z } from 'zod'

const base64ImageRegex = /^data:image\/(png|jpg|jpeg|webp);base64,[A-Za-z0-9+/=]+$/

export const produitSchema = z.object({
  libelle: z.string()
    .min(1, 'Le libellé est obligatoire')
    .max(150, 'Le libellé ne doit pas dépasser 150 caractères'),

  qte: z.number({
    required_error: 'La quantité est obligatoire',
    invalid_type_error: 'La quantité doit être un nombre'
  })
    .int('La quantité doit être un entier')
    .min(1, 'La quantité doit être au moins 1')
    .max(10, 'La quantité ne doit pas dépasser 10'),

  prix: z.number({
    required_error: 'Le prix est obligatoire',
    invalid_type_error: 'Le prix doit être un nombre'
  })
    .positive('Le prix doit être supérieur à 0'),


  categoryId: z.number({
    required_error: 'La catégorie est obligatoire',
    invalid_type_error: 'categoryId doit être un entier'
  })
    .int('categoryId doit être un entier')
    .positive('categoryId doit être un entier positif'),

  fournisseurId: z.number({
    required_error: 'Le fournisseur est obligatoire',
    invalid_type_error: 'fournisseurId doit être un entier'
  })
    .int('fournisseurId doit être un entier')
    .positive('fournisseurId doit être un entier positif')
})

export const produitCreateSchema = produitSchema
export const produitUpdateSchema = produitSchema.partial()