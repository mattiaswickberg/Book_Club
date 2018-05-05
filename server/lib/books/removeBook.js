let Bookcase = require('../../models/BookCase')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    // Check data
    if (data === undefined || data === null) { resolve('Function did not receive any data') }
    // Check bookID and caseID
    if (typeof data.bookID !== 'string') { resolve('Not a valid book ID') }
    if (typeof data.caseID !== 'string') { resolve('Not a valid case ID') }
    // Get bookcase from database
    let query = Bookcase.findById(data.caseID)
    query.exec().then(bookCase => {
      // console.log(bookCase)
      // Get book list from bookcase and remove book
      let books = bookCase.get('books')

      let newBooks = books.filter(book => book._id.toString() !== data.bookID)
      // Set new book list
      /* console.log('Revised book list is: ')
      console.log(newBooks) */
      bookCase.set('books', newBooks)
      // Save to database
      bookCase.save(function (err, doc) {
        if (err) { resolve(err) }
        // console.log(doc)
        console.log('Book removed')
        resolve('Book removed')
      })
    })
  })
}
