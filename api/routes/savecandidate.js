import { createsavecandidate } from "../controllers/savecandidate.controller";
import express from express;

const router = express.Router();

router.post('/savecandidate',createsavecandidate);