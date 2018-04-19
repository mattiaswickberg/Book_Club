let Book = require('../../models/Book')
let Bookcase = require('../../models/BookCase')

module.exports = function (book) {
  console.log(book)
    // Check if book exists in db
  Book.findOne({isbn: book.book.isbn}).then(response => {
            // If not, add to database
    if (response === null) {
      let newBook = new Book({
        title: book.book.title,
        author: book.book.creator,
        publishedYear: book.book.date,
        isbn: book.book.isbn,
        users: [book.user._id]
      })

      newBook.save(function (error) {
        if (error) { console.log(error) }
      })
      console.log(newBook)
    } else {
      let bookUsers = response.get('users')
      bookUsers.push(book.user._id)
      response.set('users', bookUsers)
      response.save(function (error) {
        if (error) { console.log(error) }
      })
    }
  })

    // Then, add to bookcase of choice
  addToBookCase(book)
}

let addToBookCase = function (book) {
  console.log(book)
  let bookToAdd
  Book.findOne({isbn: book.book.isbn}).then(response => {
    console.log('response is:')
    console.log(response)

    bookToAdd = {
      _id: response._id,
      title: response.title,
      author: response.author
    }
  })

  Bookcase.findById(book.bookcase).then(response => {
    let books = response.get('books')
    books.push(bookToAdd)
    response.set('books', books)
    response.save(function (error) {
      if (error) { console.log(error) }
    })
  })
}
