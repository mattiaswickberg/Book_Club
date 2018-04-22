// let getImage = require('../books/getImage')

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
     // get images for books
    /* consolidatedBooks.forEach(element => {
      if (element.isbn !== undefined) {
        return getImage(element.isbn).then(image => {
          element.images.push(image)
        })
      }
    }) */

    console.log(consolidatedBooks)
    resolve(consolidatedBooks)
  })
}
