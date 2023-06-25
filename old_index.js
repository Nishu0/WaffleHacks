require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000; // Change this to the desired port number
const path = require('path');
const API_KEY = process.env.API_KEY;
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views')
]);
app.use(express.static(path.join(__dirname, 'public')));

// Define a route handler for the home page
app.get('/', (req, res) => {
  // Render the EJS template
  res.render('index2.ejs');
});

// Set up Multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// POST route for file upload
app.post('/upload', upload.single('image'), async (req, res) => {
  // Check if file was uploaded successfully
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;

    // Delete the uploaded file from the local filesystem
    fs.unlink(req.file.path, (error) => {
      if (error) {
        console.error(error);
      }
    });

    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during file upload' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
