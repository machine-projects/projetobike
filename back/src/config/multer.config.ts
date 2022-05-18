import { diskStorage } from "multer"
import { extname } from "path"

const configMulter = diskStorage({
    destination: './uploads', 
    filename: (req, file, cb) => {
    const randomName = Array(8).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('') + new Date().getTime()
    return cb(null, `${randomName}${extname(file.originalname)}`)
  }
  })
  
  export default configMulter