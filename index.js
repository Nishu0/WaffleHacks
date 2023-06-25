require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000; // Change this to the desired port number
const path = require('path');
app.use(express.json()); 

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views',[path.join(__dirname, 'views'),
        path.join(__dirname, 'views')]
);
app.use(express.static(path.join(__dirname,'public')));

// Define a route handler for the home page
app.get('/', (req, res) => {
  // Render the EJS template
  res.render('index.ejs');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
