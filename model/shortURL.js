const mongoose = require('mongoose')

const shortURLSchema = new mongoose.Schema({
  longURL: {
    type: String,
    require: true
  },
  short: {
    type: String,
    require: true,
    default: Math.random().toString(36).substr(2, 5)
  }
})

module.exports = mongoose.model('shortURL', shortURLSchema)
