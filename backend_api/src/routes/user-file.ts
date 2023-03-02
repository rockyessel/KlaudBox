import express from 'express';
import { UserLogin, UserSignUp } from '../controllers/user-file';

const router = express.Router();

// login route
router.post('/login', UserLogin);
router.post('/sign-up', UserSignUp);

export = router;
