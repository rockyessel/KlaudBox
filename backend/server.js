const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()


app.use(cors())

const storageEn = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './uploads')
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '--' + file.originalname)
    }
})


const upload = multer({storage: storageEn})


app.post('/single-upload', upload.single('images'), (request, response) => {

    console.log('files:', request.file)
    response.status(200).json(request.file)
})

app.get('/single-upload', (request, response) => {
    response.status(200).json({})
})


app.post('/multiple-uploads', upload.array('images', 5), (request, response) => {

    const {files,body:{images}} = request

    console.log('body',images[4])

    console.log('multiples files:',files)
    response.status(200).json(files)
})


app.listen(5000)