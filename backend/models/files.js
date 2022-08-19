const mongoose = require('mongoose');

const ImgSchema = mongoose.Schema(
  {
    name: String,
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ImgSchema', ImgSchema);
