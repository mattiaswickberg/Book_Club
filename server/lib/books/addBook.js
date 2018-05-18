let Book = require('../../models/Book')
let Bookcase = require('../../models/BookCase')
let getImage = require('../books/getImage')

module.exports = function (book) {
  return new Promise(function (resolve, reject) {
    // Call function to check data
    checkData(book).then(response => {
      if (response === 'Data ok') {
        // Check if book is aready in database
        checkBookInDatabase(book).then(response => {
          if (response !== null) {
            // If book is in database, add book to bookcase
            saveToBookcase(book, response).then(response => {
              resolve(response)
            })
          } else {
            // If book is not in database, create one and then save to user bookcase
            createBook(book).then(response => {
              saveToBookcase(book, response).then(response => {
                resolve(response)
              })
            })
          }
        })
      } else {
        resolve(response)
      }
    })
    .catch(err => { console.log(err) })
  })
}

const checkData = function (book) {
  return new Promise(function (resolve, reject) {
    if (book === undefined || book === null) {
      console.log('Missing data')
      resolve('Missing input data')
    } else if (typeof book.book.title !== 'string') {
      console.log('Bad info')
      resolve('Wrong data type in mandatory information')
    } else if (book.bookcase._id === undefined || book.bookcase._id === null || book.bookcase._id.length === 0) {
      console.log('bad bookcase')
      resolve('No bookcase provided!')
    } else {
      resolve('Data ok')
    }
  })
}

const checkBookInDatabase = function (book) {
  return new Promise(function (resolve, reject) {
    Book.findOne({isbn: book.book.isbn}, function (err, doc) {
      if (err) { reject(err) }
      resolve(doc)
    })
  })
}

const createBook = function (book) {
  return new Promise(function (resolve, reject) {
    let newBook = {}
    if (book.book.title.length < 1) {
      newBook.title = 'Untitled'
    } else {
      newBook.title = book.book.title
    }

    if (book.book.creator === undefined) {
      if (book.book.author === undefined) {
        newBook.author = 'Author unknown'
      } else {
        newBook.author = book.book.author
      }
    } else {
      newBook.author = book.book.creator
    }

    if (book.book.date === undefined || book.book.date === null) {
      newBook.publishedYear = 'Unknown'
    } else {
      newBook.publishedYear = book.book.date
    }

    newBook.isbn = book.book.isbn
    newBook.users = [book.user_id]

    if (book.book.language === undefined || book.book.language === null) {
      newBook.language = 'unknown'
    } else {
      newBook.language = book.book.language
    }

    // Call function to get image from google books api
    getImage(book.book.isbn).then(response => {
      newBook.images = response

      let book = new Book(newBook)
      book.save(function (err, doc) {
        if (err) { console.log(err) }
        resolve(doc)
      })
    })
  })
}

const saveToBookcase = function (book, newBook) {
  return new Promise(function (resolve, reject) {
    addUserToBook(book, newBook).then(response => {
      let bookToAdd = response
      // Get bookcase with provided id
      Bookcase.findById(book.bookcase._id).then(response => {
        let books = response.get('books')
        // Check if book is already in bookcase, to prevent duplicates
        books.forEach(element => {
          if (element !== null && element !== undefined) {
            if (element._id.toString() === bookToAdd._id) {
              resolve('Book already in Bookcase')
            }
          }
        })
        // Add book to array
        books.push(bookToAdd)
        response.set('books', books)
        // Save updated bookcase to db
        response.save(function (err, doc) {
          if (err) { console.log(err) }
          resolve('Book added')
        })
      })
    })
  })
}

// Function to add users to array of users that have had book in bookcase
const addUserToBook = function (book, newBook) {
  return new Promise(function (resolve, reject) {
    let bookUsers = newBook.get('users')
    let userNotInList = true
    bookUsers.forEach(element => {
      if (element === book.user._id) { userNotInList = false }
    })
    if (userNotInList) {
      bookUsers.push(book.user._id)
      newBook.set('users', bookUsers)
      newBook.save(function (err, doc) {
        if (err) {
          console.log(err)
        }
        resolve(doc)
      })
    } else {
      resolve(newBook)
    }
  })
}
