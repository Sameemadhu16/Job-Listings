import {createposterresponse, createseekerresponse, getposterresponse, getseekerresponse} from "../controllers/savecandidate.controller.js";
import express from 'express';

const router = express.Router();

router.put('/response1/:postId/:userId',createseekerresponse);
router.put('/response2/:postId/:userId',createposterresponse);
router.get('/seekerres',getseekerresponse);
router.get('/posterres',getposterresponse);

export default router; 