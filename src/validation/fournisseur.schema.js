import { z } from 'zod'

export const fournisseurSchema = z.object({
  prenom: z.string()
    .min(1, 'Le prénom est obligatoire')
    .max(50, 'Le prénom ne doit pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Le prénom ne doit contenir que des lettres, espaces, tirets et apostrophes'),

  nom: z.string()
    .min(1, 'Le nom est obligatoire')
    .max(50, 'Le nom ne doit pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Le nom ne doit contenir que des lettres, espaces, tirets et apostrophes'),

  adresse: z.string()
    .min(1, "L'adresse est obligatoire")
    .max(200, "L'adresse ne doit pas dépasser 200 caractères"),

  email: z.string()
    .min(1, "L'email est obligatoire")
    .email("L'email doit être valide (ex: niang@gmail.com)"),

  telephone: z.string()
    .regex(
      /^\+221(77|78|76)[0-9]{7}$/,
      'Le téléphone doit commencer par +221 suivi de 77, 78 ou 76 et contenir 9 chiffres après +221'
    )
})

export const fournisseurCreateSchema = fournisseurSchema
export const fournisseurUpdateSchema = fournisseurSchema.partial()
