import express from 'express';
import { addContact } from '../controllers/contact.controller';

const router = express.Router();
router.post('/create', addContact);

export default router;