const ImgSchema = require('../models/files');
const CharacterGeneration = require('../config/random')
const fs = require('fs');




const uploadImage = async (request, response) => {
  try {
    const numberString = CharacterGeneration()
    console.log('numberString',numberString)
    const {code, name} = request.body

    const saveImage = await  ImgSchema.create({
      name,
      code: numberString,
      image: {
        data: fs.readFileSync('./uploads/' + request.file.filename),
        contentType: 'image/png',
      },
    });

    await saveImage.save();

    response.status(201).json({ status: 'image save' });
  } catch (error) {
    console.log(error);
  }
};


const getAllUploads = async (request, response) => {
  const data = await ImgSchema.find({})

  response.json(data)
}

const validateImage = async (request, response) => {
  const {code} = request.body

  if(!code){
    response.status(401).json({
      msg: 'Input cannopt be empty'
    })
  }

  const codeExist = await ImgSchema.find({code})

  if(codeExist){
    response.status(200).json(codeExist)
  }else{
    response.status(400).json({
      msg: 'Code is not found in database'
    })
  }
}

module.exports = {
  uploadImage,
  getAllUploads,
  validateImage,
};
