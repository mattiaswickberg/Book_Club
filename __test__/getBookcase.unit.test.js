/* global test, expect */

let getBookcase = require('../server/lib/bookcases/getBookCase')

test('28.1: GetBookcase should return null if provided with id that is not a string', () => {
  expect.assertions(1)
  getBookcase(43853487593475).then(response => {
    expect(response).toEqual('Not a valid user ID')
  })
  .catch(err => { console.log(err) })
})

test('28.2: GetBookcase should return error if provided no argument', () => {
  expect.assertions(1)
  getBookcase().then(response => {
    expect(response).toEqual('Not a valid user ID')
  })
  .catch(err => { console.log(err) })
})
