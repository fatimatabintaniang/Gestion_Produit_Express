import { z } from 'zod'

export const categorieSchema = z.object({
  libelle: z.string()
    .min(1, 'Le libelle est obligatoire')
    .max(100, 'Le libelle ne doit pas dépasser 100 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Le libelle ne doit contenir que des lettres, espaces, tirets et apostrophes')
})

export const categorieCreateSchema = categorieSchema
export const categorieUpdateSchema = categorieSchema.partial()