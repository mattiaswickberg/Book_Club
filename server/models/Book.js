let mongoose = require('mongoose')

let BookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  publishedYear: String,
  isbn: [],
  language: String,
  images: {type: Array,
    default: [{
      smallThumbnail: './static/blank-book-cover-small.png',
      thumbnail: './static/blank-book-cover.png'
    }]},
  comments: [{
    user: String,
    comment: String,
    date: {type: Date, default: Date.now},
    replies: [{
      user: String,
      comment: String,
      date: {type: Date, default: Date.now}
    }]
  }],
  ratings: [{user: String, rating: Number, date: {type: Date, default: Date.now}}],
  dateAdded: {type: Date, default: Date.now},
  users: []
})

let Book = mongoose.model('Book', BookSchema)
module.exports = Book
