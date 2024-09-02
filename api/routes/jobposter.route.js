import express from 'express';

import { verifyToken } from '../utils/verifyUser.js';
import { deleteJobposter, getJobPosterByID, getJobPosters, updateJobposter } from '../controllers/jobposter.controller.js';

const router = express.Router();

router.get('/get',getJobPosters);  //retrive jobPoster
router.get('/get/:userId',verifyToken,getJobPosterByID)
router.put('/update/:userId',verifyToken,updateJobposter);
router.delete('/delete/:userId',verifyToken,deleteJobposter);



export default router;