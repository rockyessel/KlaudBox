import express from 'express';
import {
  FilesPost,
  TempFileLink,
  FilesDelete,
  GetAllFiles,
  GuestFileSlug,
} from '../controllers/files';
import { file_upload } from '../utils/services';
import { protect } from '../middleware/user-auth';

const router = express.Router();

router.post('/', file_upload.array('files',5), protect, FilesPost);
router.get('/', protect, GetAllFiles);
router.get('/find/:filename', protect, TempFileLink);
router.get('/path/:path', protect, TempFileLink);
router.delete('/delete/:filename', protect, FilesDelete);

export = router;
