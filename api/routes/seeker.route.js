import express from 'express'
import { addappliedjobs, addcart, deleteCartpost, getapplied, getcart, getJobs } from '../controllers/seeker.controller.js'

const router = express.Router();
router.get('/getjobs', getJobs);
router.get('/getjobs/:postId',getJobs)
router.post('/addcart/:userId', addcart);
router.post('/addapplied/:userId', addappliedjobs);
router.get('/getcart/:userId', getcart);
router.get('/getapplied/:userId', getapplied);
router.delete('/deletecartpost/:cartPostIdToDelete/:currentUserId',deleteCartpost)

//router.get('/getcart/:userId', getcart);
export default router;