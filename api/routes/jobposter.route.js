import express from 'express';
import { deleteJobposter, getJobPosterByID, getJobPosters, updateJobposter} from '../controllers/jobposter.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/get',getJobPosters);  //retrive jobPosters
router.get('/get/:userId',verifyToken,getJobPosterByID)
router.put('/update/:userId',verifyToken,updateJobposter)
router.delete('/delete/:userId',verifyToken,deleteJobposter)

export default router; 