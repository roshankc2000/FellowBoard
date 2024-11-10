import express from 'express';
import { createEvent, getEvent, getEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createEvent);
router.get('/my-events', auth, getEvents); 
router.get('/:eventId', auth, getEvent);
router.put('/:eventId', auth, updateEvent);
router.delete('/:eventId', auth, deleteEvent);


export default router;
