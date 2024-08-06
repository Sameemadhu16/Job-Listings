import express from 'express';
import { getJobPosterByID, getJobPosters, updateJobposter} from '../controllers/jobposter.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/get',verifyToken,getJobPosters);  //retrive jobPosters
router.get('/get/:userId',verifyToken,getJobPosterByID)
router.put('/update/:userId',verifyToken,updateJobposter)

export default router;