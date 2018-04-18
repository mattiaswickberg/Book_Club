/* global test, expect */

let getBooks = require('../server/lib/books/getBooks')

test('28.3: getBooks should return null if provided with something other than a string', () => {
  expect.assertions(1)
  var data = getBooks(74361987364)
  expect(data).toEqual('null')
})
