let Book = require('../../models/Book')

module.exports = function (bookID) {
  return new Promise(function (resolve, reject) {
    if (bookID === undefined || bookID === null) {
      resolve('Invalid book ID')
    } else {
      Book.findById(bookID, function (err, book) {
        if (err) {
          console.log(err)
          resolve('Invalid book ID')
        } else if (typeof book === 'object') {
          resolve(book)
        } else {
          resolve('Book not found')
        }
      })
    }
  })
}
