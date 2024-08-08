import express from 'express';
import { updateSeeker } from '../controllers/jobseeker.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/update/:userId',verifyToken,updateSeeker);

export default router;