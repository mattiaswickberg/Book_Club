let mongoose = require('mongoose')

let BookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  publishedYear: String,
  isbn: String,
  picture: String,
  comments: [{body: String, date: {type: Date, default: Date.now}}],
  ratings: [{user: String, rating: Number, date: {type: Date, default: Date.now}}],
  dateAdded: {type: Date, default: Date.now},
  users: []
})

let Book = mongoose.model('Book', BookSchema)
module.exports = Book
