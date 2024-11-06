import express from 'express';
import { getUser, getUsers, signin, signout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin',signin);

router.post('/signout',signout);
router.get('/get-users',getUsers);
router.get('/get-user/:userId',getUser)

export default router;
