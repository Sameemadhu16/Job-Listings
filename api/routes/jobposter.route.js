import express from 'express';
import { getJobPosters, updateJobpoter } from '../controllers/jobposter.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/get',verifyToken,getJobPosters);  //retrive jobPosters
router.put('/update/:jobposterId',updateJobpoter,verifyToken)

export default router;