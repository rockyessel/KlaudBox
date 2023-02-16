import express from 'express';
import { GuestPost, GuestGet, GuestDelete, GuestGetAll } from '../controllers/guest-file';
import { upload } from '../utils/services';

const router = express.Router();

router.get('/guest/all', GuestGetAll);
router.post('/guest', upload.single('file'), GuestPost);
router.get('/guest/:identifier', GuestGet);
router.delete('/guest/:identifier', GuestDelete)
export = router;
