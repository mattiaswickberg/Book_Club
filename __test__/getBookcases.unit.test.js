/* global test, expect */

let getBookCases = require('../server/lib/bookcases/getBookCases')

test('28.4: getBookcases should return error message if called without argument', () => {
  expect.assertions(1)
  getBookCases()
  .then(response => {
    console.log(response)
    expect(response).toEqual('Not a valid userID')
  })
})
