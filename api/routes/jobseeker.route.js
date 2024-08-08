import express from 'express';
import { deleteSeeker, updateSeeker } from '../controllers/jobseeker.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.put('/update/:userId',verifyToken,updateSeeker);
router.delete('/delete/:userId',verifyToken,deleteSeeker);

export default router;