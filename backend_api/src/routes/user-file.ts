import express from 'express';
import {
  UserPost,
  UserGet,
  UserDelete,
  UserGetAll,
} from '../controllers/user-file';

const router = express.Router();

router.get('/user/all', UserGetAll);
router.post('/user', UserPost);
router.get('/user/:identifier', UserGet);
router.delete('/user/:identifier', UserDelete);
export = router;
