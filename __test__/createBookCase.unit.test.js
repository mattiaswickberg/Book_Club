/* global test, expect */

let createBookCase = require('../server/lib/bookcases/createBookCase')

test('U9.1: createbookcase should return error message if user data is missing', () => {
  expect.assertions(1)
  let response = createBookCase()
  expect(response).toEqual('Username missing')
}) 

test('U9.2: createBookcase should return error message if no title was provided', () => {
  expect.assertions(1)
  let response = createBookCase('Greencow')
  expect(response).toEqual('Title for bookcase missing')
})
