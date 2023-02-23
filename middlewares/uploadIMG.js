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

const uploadProductImages = multer({
    storage : storageProductIMG
});

module.exports = {
    uploadProductImages
}