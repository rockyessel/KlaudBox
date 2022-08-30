const multer = require("multer");


const storageEn = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './uploads')
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '--' + file.originalname)
    }
})


const upload = multer({storage: storageEn})


module.exports = {upload}