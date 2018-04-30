let checkIfBookInDb = require('../books/checkIfBookInDb')

module.exports = function (books) {
  return new Promise(function (resolve, reject) {
    let consolidatedBooks = []
    if (books.length === 0) {
      resolve(consolidatedBooks)
    }
    // take book in array, get list of versions from KB
    // console.log(books)
    while (books.length > 0) {
      books.forEach(element => {
        if (element.date === undefined) {
          books.splice(books.indexOf(element), 1)
        }
      })

      let book = books[0]
      let newBook = {creator: book.creator, title: book.title, isbn: [book.isbn], type: book.type, date: book.date, language: book.language, images: []}
      for (var i = 0; i < books.length; i += 1) {
        if (book.creator === books[i].creator && book.title === books[i].title && book.language === books[i].language) {
          newBook.isbn.push(books[i].isbn)
          books.splice(i, 1)
        }
      }
      let cleanArray = [].concat.apply([], newBook.isbn)
      newBook.isbn = cleanArray
        // push consolidated book version into new array
      consolidatedBooks.push(newBook)
      books.shift()
    }

    // Check if book is already in Db
    let promises = []
    consolidatedBooks.forEach(element => {
      promises.push(
        checkIfBookInDb(element.isbn).then(response => {
          if (response !== 'Book not in Db') {
            let index = consolidatedBooks.indexOf(element)
            if (index !== -1) {
              consolidatedBooks[index] = response
            }
          }
        }))
    })

    Promise.all(promises).then(function () {
      // console.log(consolidatedBooks)
      resolve(consolidatedBooks)
    })
  })
}
