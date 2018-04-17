let Book = require('../../models/Book')

module.exports = function (bookID) {
  Book.findById(bookID, function (err, book) {
    if (err) {
      console.log(err)
    } else if (typeof book === 'object') {
      return book
    } else {
      return null
    }
  })
}
