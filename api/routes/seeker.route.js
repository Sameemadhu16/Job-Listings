import express from 'express'
import { getjobs } from '../controllers/seeker.controller.js'

const router = express.Router();
router.get('/getposts', getposts);

export default router;