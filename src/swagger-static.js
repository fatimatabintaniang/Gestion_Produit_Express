import fs from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Router } from 'express'

const __dirname = dirname(fileURLToPath(import.meta.url))

const swaggerDoc = JSON.parse(
  fs.readFileSync(join(__dirname, '..', 'swagger.json'))
)

const swaggerRouter = Router()

/* ---------- JSON brut ---------- */
swaggerRouter.get('/openapi.json', (req, res) => res.json(swaggerDoc))

/* ---------- UI Swagger (CDN) ---------- */
const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Gestion_Produit API · Swagger</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>html,body{margin:0;padding:0;height:100%}</style>
</head>
<body>
  <div id="swagger-ui" style="height:100%"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    window.onload = () => {
      SwaggerUIBundle({
        url: '/docs/openapi.json',
        dom_id: '#swagger-ui',
      });
    };
  </script>
</body>
</html>
`

swaggerRouter.get('/', (req, res) => res.send(html))

export default swaggerRouter