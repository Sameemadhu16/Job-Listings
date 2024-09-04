import express from 'express';
import { getUser, signin, signout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin',signin);

router.post('/signout',signout);
router.get('/get-users',getUser);

export default router;
