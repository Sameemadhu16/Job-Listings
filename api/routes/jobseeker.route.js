import express from 'express';

import { deleteSeeker, getJobSeekerByID, getJobSeekers, seekerSignout, updateSeeker } from '../controllers/jobseeker.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/get',getJobSeekers);  //retrive jobSeekers
router.get('/get/:userId',verifyToken,getJobSeekerByID)
router.put('/update/:userId',verifyToken,updateSeeker);
router.delete('/delete/:userId',verifyToken,deleteSeeker);
router.post('/seeker-signout',seekerSignout);


export default router;