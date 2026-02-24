// utils/uploadImage.js
import { cloudinary } from '../config/cloudinary.js'

export const uploadImage = (buffer, mimetype, folder = 'produits') => {
  return new Promise((resolve, reject) => {
    if (!buffer) return reject(new Error('Image requise'))

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }],
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result.secure_url)
      }
    )

    stream.end(buffer)
  })
}

export const deleteImage = async (imageUrl) => {
  if (!imageUrl) return
  const urlParts = imageUrl.split('/')
  const filename = urlParts[urlParts.length - 1].split('.')[0]
  const publicId = `produits/${filename}`
  await cloudinary.uploader.destroy(publicId)
}