let mongoose = require('mongoose')

let BookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  publishedYear: String,
  isbn: String,
  picture: String,
  comments: [{body: String, date: {type: Date, default: Date.now}}],
  rating: Number,
  dateAdded: {type: Date, default: Date.now}
})

let Book = mongoose.model('Book', BookSchema)
module.exports = Book
