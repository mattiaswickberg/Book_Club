let Bookcase = require('../../models/BookCase')
module.exports = function (bookID, caseID) {
  return new Promise(function (resolve, reject) {
    // Check bookID and caseID
    if (typeof bookID !== 'string') { resolve('Not a valid book ID') }
    if (typeof caseID !== 'string') { resolve('Not a valid case ID') }
    // Get bookcase from database
    let query = Bookcase.findById(caseID)
    query.exec().then(bookCase => {
      // Get book list from bookcase and remove book
      let books = bookCase.get('books')
      let newBooks = books.filter(book => book._id !== bookID)
      // Set new book list
      Bookcase.set('books', newBooks)
      // Save to database
      Bookcase.save(function (err, doc) {
        if (err) { resolve(err) }
        resolve(doc)
      })
    })
  })
}
