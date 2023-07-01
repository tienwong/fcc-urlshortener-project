require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

const urlEncodedParser = bodyParser.urlencoded({ extended: true })

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', urlEncodedParser, async (req, res) => {
  try {
    const con = await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true})
    console.log('MongoDB is connected.')
    // dummy implementation just to make sure this is working right
    res.send({ original_url: req.body.url, short_url: 'for right now this is just something random!' })
  }
  catch (err) {
    res.send({ error: err })
  }
})

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
