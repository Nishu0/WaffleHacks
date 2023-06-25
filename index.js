require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const jsonParser = express.json();
app.use(jsonParser); 
const fetch = require('node-fetch'); //npm install node-fetch@2
const https = require('https');

app.set('views',[path.join(__dirname, 'views'),
        path.join(__dirname, 'views')]
);

app.get('/',(req,res)=>{
    res.render('index.ejs');
});

app.post('/describe', (req, res) => {
    const imageUrl = req.body.imageUrl;
  
    const requestData = {
      tkn: '80DA34F4-746E-4764-83BC-E0C0AD5F65003F455633-D7B2-4294-83EC-FADF7EEB778A',
      modelVersion: '1.0_full',
      input: imageUrl,
      visionParams: 'gpt'
    };
  
    const agent = new https.Agent({ rejectUnauthorized: false });
    fetch('https://astica.ai:9141/vision/describe', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
      },
      agent: agent,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
      });
  });

app.listen(8000, () => {
  console.log('Server is running on port 3000');
});
