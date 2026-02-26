//v2 est la version majeure de l'API de Cloudinary, qui offre des fonctionnalités améliorées et une meilleure performance par rapport à la version précédente. En utilisant v2, nous pouvons bénéficier des dernières fonctionnalités et optimisations de Cloudinary pour gérer les médias dans notre application.
import { v2 as cloudinary } from 'cloudinary'
import { env } from './env.js'

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
})

export { cloudinary }