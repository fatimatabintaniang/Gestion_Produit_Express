// multer permet de gérer les fichiers envoyés dans les requêtes HTTP, notamment les images pour les profils utilisateurs.
import multer from 'multer'

// Configuration de multer pour stocker les fichiers en mémoire avant de les traiter (par exemple, pour les redimensionner ou les convertir avant de les enregistrer sur le disque ou dans une base de données).
const storage = multer.memoryStorage() 

// Exportation de la configuration de multer pour être utilisée dans les routes où les fichiers sont uploadés.
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  //cb est une fonction de rappel qui indique à multer si le fichier est accepté ou rejeté en fonction de son type MIME. Seuls les formats d'image courants sont autorisés (jpeg, png, webp, jpg).
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Format invalide. Seuls jpg, jpeg, png, webp sont acceptés'))
    }
  }
})