import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
