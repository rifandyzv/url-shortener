const express = require('express')
const mongoose = require('mongoose')
const ShortURL = require('./model/shortURL')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const path = require('path')
const app = express()

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(express.static(path.join(__dirname, 'view')))

mongoose.connect('mongodb://localhost:27017/url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
})

app.listen(3000)
console.log('server live on port 3000')

app.get('/', (req, res) => {
  res.sendFile('view/index.html', { root: __dirname })
})

app.post('/shortURL', async (req, res, e) => {
  try {
    // e.preventDefault()
    const newShort = new ShortURL({
      longURL: req.body.longURL,
      short: Math.random().toString(36).substr(2, 5)
    })

    // document.getElementsById('short-link').innerHTML = newShort.short
    const savedShort = await newShort.save()
    console.log(savedShort)
    res.status(200).json(savedShort)
    // res.redirect('/')
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

// app.get('/shortURL', async (req, res) => {
//   try {
//     const urlData = await ShortURL.find()

//     res.json(urlData)
//   } catch {
//     res.status(404)
//   }
// })

app.get('/:shortID', async (req, res) => {
  try {
    const link = await ShortURL.findOne({ short: req.params.shortID })
    res.redirect(link.longURL)
  } catch (err) {
    console.log(err)
    res.sendStatus(404)
  }
})
