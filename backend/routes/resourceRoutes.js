import express from 'express';
import { createResource, getResources } from '../controllers/resourceController.js';
import upload from '../config/multer.js';

const router = express.Router();

router.post('/create', upload.single('file'), createResource);
router.get('/', getResources);

export default router;
