import express from 'express';
import { GuestPost, GuestGet } from '../controllers/guest-file';
import { upload } from '../utils/services';

const router = express.Router();

router.route('/guest').post(upload.single('file'), GuestPost).get(GuestGet);

export = router;
