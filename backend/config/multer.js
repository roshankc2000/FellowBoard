// config/multer.js

import multer from 'multer';
import path from 'path';

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to the file name
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage });

export default upload;
