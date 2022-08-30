const ImgSchema = require('../models/files');
const fs = require('fs');

const uploadImage = async (request, response) => {
  try {
    const saveImage = new ImgSchema({
      name: request.body.name,
      image: {
        data: fs.readFileSync('uploads/' + request.file.filename),
        contentType: 'image/png',
      },
    });
    await saveImage.save();
    response.status(201).json({ status: 'image save' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadImage,
};
