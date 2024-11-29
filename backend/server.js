import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import path from 'path';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes); // User-related APIs
app.use('/api/teams', teamRoutes); // Team-related APIs
app.use('/api/events', eventRoutes); // Event-related APIs

// Serve static files from the "public" folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
