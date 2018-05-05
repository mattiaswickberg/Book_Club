/* global test, expect */

let removeBook = require('../server/lib/books/removeBook')

test('14.1: removeBook should return error message if not provided with any input', () => {
  expect.assertions(1)
  removeBook()
  .then(response => {
    console.log(response)
    expect(response).toEqual('Function did not receive any data')
  })
})

test('14.1: removeBook should return error message if provided with bad bookID', () => {
  expect.assertions(1)
  removeBook({
    bookID: 237864283746,
    caseID: '7326428374'
  })
  .then(response => {
    console.log(response)
    expect(response).toEqual('Not a valid book ID')
  })
})

test('14.1: removeBook should return error message if provided with bad caseID', () => {
  expect.assertions(1)
  removeBook({
    bookID: '237864283746',
    caseID: 7326428374
  })
  .then(response => {
    console.log(response)
    expect(response).toEqual('Not a valid case ID')
  })
})
