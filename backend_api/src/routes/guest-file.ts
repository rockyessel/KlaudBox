import express from 'express';
import {
  GuestPost,
  GuestGet,
  GuestDelete,
  GuestGetAll,
  GuestFileSlug,
} from '../controllers/guest-file';
import { upload } from '../utils/services';
// import { protect } from '../middleware/user-auth';

const router = express.Router();

router.get('/all', GuestGetAll);
router.post('/', upload.single('file'), GuestPost);
router.get('/:identifier', GuestGet);
router.get('/path/:cms_id', GuestFileSlug);
router.delete('/:identifier', GuestDelete);

export = router;
