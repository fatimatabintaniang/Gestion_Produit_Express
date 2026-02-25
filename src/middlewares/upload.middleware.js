import multer from 'multer'

const storage = multer.memoryStorage() 

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Format invalide. Seuls jpg, jpeg, png, webp sont acceptés'))
    }
  }
})