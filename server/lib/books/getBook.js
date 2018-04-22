let Book = require('../../models/Book')
let getImage = require('../books/getImage')

module.exports = function (bookID) {
  return new Promise(function (resolve, reject) {
    if (typeof bookID !== 'string') {
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
