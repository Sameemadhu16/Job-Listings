import express from 'express'
import { getJobs } from '../controllers/seeker.controller.js'

const router = express.Router();
router.get('/getjobs', getJobs);

export default router;