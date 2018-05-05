/* global test, expect */

let addComment = require('../server/lib/books/addCommentToBook')

test('15.1: addCommentToBook should return an error message if provided with no data', () => {
  expect.assertions(1)
  addComment()
  .then(response => {
    console.log(response)
    expect(response).toEqual('No data found')
  })
})
test('15.2: addCommentToBook should return error message if not provided with a bookID', () => {
  expect.assertions(1)
  addComment({
    comment: 'Yup'
  })
  .then(response => {
    console.log(response)
    expect(response).toEqual('Book ID missing')
  })
})
test('15.3: addCommentToBook should return error message if not provided with a comment', () => {
  expect.assertions(1)
  addComment({
    bookID: '937823764328764',
    comment: ''
  })
  .then(response => {
    console.log(response)
    expect(response).toEqual('No comment found')
  })
})
