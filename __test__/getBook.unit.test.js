 /* global test, expect */

let getBook = require('../server/lib/books/getBook')

test('13.1: GetBook should return null if called with argument that is not a string', () => {
  expect.assertions(1)
  getBook(7162873692764)
  .then(response => {
    expect(response).toEqual('Invalid book ID')
  })
})

test('13.2: GetBook should return null if called with ID not in database', () => {
  expect.assertions(1)
  getBook('notavalidbookid')
  .then(response => {
    expect(response).toEqual('Invalid book ID')
  })
})
