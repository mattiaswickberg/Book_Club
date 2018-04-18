let Book = require('../../models/Book')

module.exports = function (bookID) {
  if (typeof bookID !== 'string') {
    return null
  } else {
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
}
