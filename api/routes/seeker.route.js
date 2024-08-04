import express from 'express'
import { addappliedjobs, addcart, getJobs } from '../controllers/seeker.controller.js'

const router = express.Router();
router.get('/getjobs', getJobs);
router.get('/getjobs/:postId',getJobs)
router.post('/addcart/:userId', addcart);
router.post('/addapplied/:userId', addappliedjobs);
export default router;