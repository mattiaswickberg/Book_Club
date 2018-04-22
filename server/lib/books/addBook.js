let Book = require('../../models/Book')
let Bookcase = require('../../models/BookCase')
let getImage = require('../books/getImage')

module.exports = function (book) {
  // console.log(book)
    // Check if book exists in db
  Book.findOne({isbn: book.book.isbn}).then(response => {
    // If not, add to database
    // Get image link from Google book API
    // getImage(book.book.isbn)

    if (response === null) {
      let newBook = new Book({
        title: book.book.title,
        author: book.book.creator,
        publishedYear: book.book.date,
        isbn: book.book.isbn,
        users: [book.user._id],
        images: []
      })

      getImage(book.book.isbn).then(response => {
        newBook.images = response
        newBook.save(function (error) {
          if (error) { console.log(error) }
        })
        // console.log(newBook)
            // Then, add to bookcase of choice
        addToBookCase(book)
      })
    } else {
      let bookUsers = response.get('users')
      bookUsers.push(book.user._id)
      response.set('users', bookUsers)
      response.save(function (error) {
        if (error) { console.log(error) }
      })
      // Then, add to bookcase of choice
      addToBookCase(book)
    }
  })
}

let addToBookCase = function (book) {
  // console.log(book)
  let bookToAdd
  Book.findOne({isbn: book.book.isbn}).then(response => {
    // console.log('response is:')
    // console.log(response)
    if (response !== null && response !== undefined) {
      bookToAdd = {
        _id: response._id,
        title: response.title,
        author: response.author,
        images: response.images
      }
    }
  })

  Bookcase.findById(book.bookcase).then(response => {
    let books = response.get('books')
    let bookExists = false
    books.forEach(element => {
      console.log('Element is: ')
      console.log(element)
      if (element !== null && element !== undefined) {
        if (element._id === bookToAdd._id) {
          bookExists = true
        }
      }
    })
    if (!bookExists && bookToAdd !== null && bookToAdd !== undefined) {
      books.push(bookToAdd)
      response.set('books', books)
      response.save(function (error) {
        if (error) { console.log(error) }
      })
    }
  })
  .catch(err => {
    console.log(err)
  })
}
