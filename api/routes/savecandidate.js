import {applyForJob, allApplications, findApplicant } from "../controllers/savecandidate.controller.js";
import express from 'express';

const router = express.Router();

router.post('/apply',applyForJob);
router.get('/allApplicants',allApplications);
router.get('/findApplicants/:userId',findApplicant);


export default router; 