import express from 'express';
import { GuestPost } from '../controllers/guest-file';
import { upload } from '../utils/services';

const router = express.Router();

router.post('/guest', upload.single('file'), GuestPost);

export = router;
