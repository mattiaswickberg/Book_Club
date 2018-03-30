let mongoose = require('mongoose')

let BookCaseSchema = new mongoose.Schema({
  title: {type: String, required: true},
  books: {type: Array, default: []}
})

let BookCase = mongoose.model('BookCase', BookCaseSchema)
module.exports = BookCase
