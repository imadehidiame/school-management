import multer from 'multer';
import path from 'path';




const storage = multer.diskStorage({
    destination: path.join(process.cwd(), 'uploads'), // Or wherever you want to store files temporarily
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
export const upload = multer({ storage: storage });



//const up = upload.single('')