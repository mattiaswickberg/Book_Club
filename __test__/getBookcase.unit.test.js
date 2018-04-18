/* global test, expect */

let getBookcase = require('../server/lib/bookcases/getBookCase')

test('28.1: GetBookcase should return null if provided with id that is not a string', () => {
  expect.assertions(1)
  var data = getBookcase(43853487593475)
  expect(data).toEqual(null)
})

test('28.2: GetBookcase should return null if provided with id that is not i database', () => {
  expect.assertions(1)
  var data = getBookcase('notavalidid')
  expect(data).toEqual(null)
})
