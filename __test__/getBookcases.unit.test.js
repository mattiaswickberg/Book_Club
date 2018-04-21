/* global test, expect */

let getBookCases = require('../server/lib/bookcases/getBookCases')

test('28.4: getBookcases should return error message if provided with something other than an array', () => {
  expect.assertions(1)
  getBookCases('saurhfaushfd')
  .then(response => {
    console.log(response)
    expect(response).toEqual('Invalid ID')
  })
})
