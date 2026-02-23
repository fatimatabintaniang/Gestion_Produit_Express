import express from 'express'
import { categorieRoutes }   from './routes/categorie.routes.js'
import { produitRoutes }     from './routes/produit.routes.js'
import { fournisseurRoutes } from './routes/fournisseur.routes.js'
import swaggerRouter         from './swagger-static.js'

export const app = express()

app.use(express.json())

/* --------- Routes --------- */
app.use('/docs',         swaggerRouter)
app.use('/categories',   categorieRoutes)
app.use('/produits',     produitRoutes)
app.use('/fournisseurs', fournisseurRoutes)

/* --------- Endpoints simples --------- */
app.get('/test', (req, res) => res.json({ ok: true }))
app.get('/',     (req, res) => res.send('API demarrer'))

/* --------- Gestion des erreurs global --------- */
app.use((err, req, res, next) => {
  if (err?.name === 'ZodError') {
    return res.status(400).json({
      message: 'Données invalides',
      errors: err.errors?.map(e => ({ field: e.path.join('.'), message: e.message })) ?? []
    })
  }
  if (err?.status) {
    return res.status(err.status).json({ message: err.message })
  }
  console.error(err)
  res.status(500).json({ message: 'Erreur serveur interne' })
})

