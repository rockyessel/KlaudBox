const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');
const ImgSchema = require('./models/files');
const fs = require('fs');
const connectDatabase = require('./config/database');
const PORT = process.env.PORT || 4000;

dotenv.config({ path: '.env' });

const app = express();

// @desc connection to MONGO DB
connectDatabase();

// @desc middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('testImage'), async (request, response) => {
  try {
    const saveImage = new ImgSchema({
      name: request.body.name,
      image: {
        data: fs.readFileSync('uploads/' + request.file.filename),
        contentType: 'image/png',
      },
    });
    saveImage.save();
    response.status(201).json({ status: 'image save' });
  } catch (error) {
    console.log(error);
  }
});

app.get('/data', async (request, response) => {
  const getAllData = await ImgSchema.find({});
  response.status(200).json(getAllData);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
