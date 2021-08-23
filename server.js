const express = require('express');
const mongoose = require('mongoose');
const ShortURL = require('./model/shortURL');
const app = express();

app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:url/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000);
console.log('server live on port 5000');

app.get('/', (req, res) => {
  res.send('asdw');
});

app.post('/shortURL', async (req, res) => {
  try {
    const newShort = new ShortURL({
      original: req.body.original,
    });

    const savedShort = await newShort.save();
    res.status(201).json(savedShort);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

app.get('/:shortID', async (req, res) => {
  try {
    const link = await ShortURL.findOne({ short: req.params.short });

    res.redirect(link.original);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});
