/* global test, expect */

let getBookcases = require('../server/lib/bookcases/getBookCases')

test('28.4: getBookcases should return null if provided with something other than an array', () => {
  expect.assertions(1)
  var data = getBookcases('saurhfaushfd')
  expect(data).toEqual(null)
})
