import express from 'express';
import { createTeam, joinTeam } from '../controllers/teamController.js';
import auth from '../middleware/auth.js'; 

const router = express.Router();

// Route to create a new team (organizer only)
router.post('/create', auth, createTeam);

// Route to join a team (user only)
router.post('/join', auth, joinTeam);

export default router;
