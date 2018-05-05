/* global test, expect */

let closeAccount = require('../server/lib/account/closeAccount')

test('25.1: closeAccount should return error message if called without data', () => {
  expect.assertions(1)
  closeAccount()
  .then(response => {
    console.log(response)
    expect(response).toEqual('No user data provided')
  })
})

test('25.2: closeAccount should return error if called with bad userID', () => {
  expect.assertions(1)
  closeAccount({
    user: '{}'
  })
  .then(response => {
    console.log(response)
    expect(response).toEqual('Account could not be removed')
  })
})

test('25.3: closeAccount should return error if called with bad userID', () => {
  expect.assertions(1)
  closeAccount({
    user: '{"id": "notavalidid"}'
  })
  .then(response => {
    console.log(response)
    expect(response).toEqual('Not a valid userID')
  })
})
