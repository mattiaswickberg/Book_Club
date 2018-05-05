/* global test, expect */

/* |U12.1|Lägga till bok|Utan argument||
|U12.2|Lägga till bok|Med fel format på title/author||
|U12.3|Lägga till bok|Utan hylla|| */

let AddBook = require('../server/lib/books/addBook')

test('12.1: AddBook should return error message when not provided vid any arguments', () => {
  expect.assertions(1)
  let response = AddBook()
  expect(response).toEqual('Missing input data')
})

test('12.2 AddBook should return error message when provided with bad information', () => {
  expect.assertions(1)
  let response = AddBook({
    book: {
      title: 3746823764,
      author: 2834792,
      isbn: ['9238428347']
    },
    bookcase: {
      _id: '2834728376482374'
    }
  })
  expect(response).toEqual('Wrong data  type in mandatory information')
})

test('12.3 AddBook should return error message when not provided vid any bookcase info', () => {
  expect.assertions(1)
  let response = AddBook({
    book: {
      title: '3746823764',
      author: '2834792',
      isbn: ['9238428347']
    },
    bookcase: {
      _id: ''
    }
  })
  expect(response).toEqual('No bookcase provided!')
})
