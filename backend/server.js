import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
