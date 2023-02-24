const multer = require('multer');
const path = require('path');

const storageProductIMG = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null, 'public/images/courses')
    },
    filename : function (req,file,callback) {
        callback(null,`${Date.now()}_products_${path.extname(file.originalname)}`)
    }
});

const configUploadProductImages = multer({
    storage : storageProductIMG,
    limits:{
        files:3
    },
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
            req.fileValidationError = "Solo se permiten imágenes";
            return cb(null,false,req.fileValidationError);
        }
        cb(null, true)
      }
});


const uploadImagesCourse = (req,res,next) =>{
    const upload = configUploadProductImages.array('images');

    upload(req,res, function (error) {
        if(error){
            req.fileValidationError = "No se acepta mas de 3 imágenes";
        }
        next()
    })}
module.exports = {
    uploadImagesCourse
}