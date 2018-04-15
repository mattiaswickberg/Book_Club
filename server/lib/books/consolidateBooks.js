const axios = require('axios')

module.exports = function (books) {
    return new Promise(function (resolve, reject) {
        let consolidatedBooks = []
        if(books.length === 0) {
            resolve(consolidatedBooks)
        }
    // take book in array, get list of versions from KB
    // console.log(books)
     while(books.length > 0) {
        let book = books[0]
        let newBook = {creator: book.creator, title: book.title, isbn: [book.isbn], type: books.type, date: book.date, originalLanguage: book.language}
        for (var i = 0; i < books.length; i += 1 ) {
            if (book.creator === books[i].creator && book.title === books[i].title) {
                newBook.isbn.push(books[i].isbn)
                books.splice(i, 1)
            }
        }
        // push consolidated book version into new array
        consolidatedBooks.push(newBook)
        books.shift()
     }
     console.log(consolidatedBooks)


    // return array
    resolve(consolidatedBooks)
    })
}