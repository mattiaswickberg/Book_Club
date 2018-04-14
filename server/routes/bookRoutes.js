let Book = require('../models/Book')
let BookCase = require('../models/BookCase')
let getListFromKb = require('../lib/books/getListFromKb')
let getBookCases = require('../lib/bookcases/getBookCases')

module.exports = function (app) {
  app.post('/search', function (req, res) {
    getListFromKb(req.body.data).then(function (data) {
      res.send(data)
    })
  })

  app.get('/book', function (req, res) {
    // Get book from database and send back
    console.log(req.body.data)
  })

  app.get('/books', function (req, res) {
    // Get books in Book Case and send back
    console.log(req.body.data)
  })

  app.post('/book', function (req, res) {
    // Add book to desired bookcase
    console.log(req.body.data)
  })

  app.delete('/book', function (req, res) {
    // Delete book from bookcase
    console.log(req.body.data)
  })

  app.put('/book', function (req, res) {
    // Update book
    console.log(req.body.data)
  })

  app.get('/bookcase', function (req, res) {
    // Get book case from database
    console.log(req.body.data)
  })

  app.get('/bookcases', function (req, res) {
    // Get a user's book cases
    getBookCases(req.query.userID).then(response => {
      res.send(response)
    })
    .catch(err => {
      console.log(err)
    })
  })

  app.post('/bookcase', function (req, res) {
    // Create new book case
    if (req.body.title.length === 0) {
      res.send('Title missing')
    } else {
      let newBookCase = new BookCase({
        user: req.user._id,
        title: req.body.title
      })

      newBookCase.save(function (error) {
        if (error) {
          console.log(error)
        }
      })

      res.send('Bookcase created')
    }
  })

  app.delete('/bookcase', function (req, res) {
    // Delete bookcase from database
    console.log(req.body.data)
  })

  app.put('/bookcase', function (req, res) {
    // Update bookcase
    console.log(req.body.data)
  })
}
