import express from 'express';

import { deleteSeeker, getJobSeekerByID, getJobSeekers, updateSeeker } from '../controllers/jobseeker.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/get',getJobSeekers);  //retrive jobSeekers
router.get('/get/:userId',getJobSeekerByID)
router.put('/update/:userId',verifyToken,updateSeeker);
router.delete('/delete/:userId',verifyToken,deleteSeeker);



export default router;