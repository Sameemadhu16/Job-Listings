import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { createMessage, getMessage, getReciveMessage } from "../controllers/messaage.controller.js";

const router = express.Router()

router.post('/create-message/:senderId/:reciverId',verifyToken,createMessage);
router.get('/get-message/:senderId/:reciveId/:postId',verifyToken,getMessage);
router.get('/get-chat/:reciveId',verifyToken,getReciveMessage);

export default router