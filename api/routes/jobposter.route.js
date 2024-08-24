import express from 'express';
import { getJobPosters } from '../controllers/jobposter.controller';


const router = express.Router();

router.get('/getjobposter',getJobPosters);  //retrive jobPosters
