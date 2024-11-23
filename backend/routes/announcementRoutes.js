import express from 'express';
import { 
    createAnnouncement, 
    getAnnouncements, 
    getAnnouncement, 
    updateAnnouncement, 
    deleteAnnouncement 
  } from '../controllers/announcementController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createAnnouncement);
router.get('/', auth, getAnnouncements);
router.get('/:announcementId', auth, getAnnouncement); 
router.put('/:announcementId', auth, updateAnnouncement); 
router.delete('/:announcementId', auth, deleteAnnouncement);

export default router;
