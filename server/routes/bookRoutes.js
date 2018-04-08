let Book = require('../models/Book')
let BookCase = require('../models/BookCase')

module.exports = function (app) {

  app.get('/book', function (req, res) {
    // Get book from database and send back
  })

  app.post('/book', function (req, res) {
    // Add book to desired bookcase
  })

  app.delete('/book', function (req, res) {
    // Delete book from bookcase
  })

  app.put('/book', function (req, res) {
    // Update book
  })

  app.get('/bookcase', function (req, res) {
    // Get bookcase from database
  })
  app.post('/bookcase', function (req, res) {
    // Create new bookcase
  })

  app.delete('/bookcase', function (req, res) {
    // Delete bookcase from database
  })

  app.put('/bookcase', function (req, res) {
    // Update bookcase
  })
}
