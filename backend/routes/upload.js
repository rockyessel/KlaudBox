
const express = require('express')
const router = express.Router()
const { uploadImage,getAllUploads,validateImage } = require('../controllers/upload')
const { upload } = require('../config/multer')

router.route('/single-upload').post(upload.single('images'), uploadImage).get(getAllUploads)

router.post('/download', validateImage)





module.exports = router