/* global test, expect */

let createAccount = require('../server/lib/createAccount')

test('7.1: CreateAccount without valid mail should return invalid mail message', () => {
  expect.assertions(1)
  var data = createAccount({
    username: 'Hubba',
    password: 'hubbabubba',
    mail: 'bubbahubba'
  })
  expect(data).toEqual('Invalid mail address')
  })

test('7.2: CreateAccount with password shorter than 8 characters should return short password message', () => {
  expect.assertions(1)
  var data = createAccount({
    username: 'Hubba',
    password: 'bubba',
    mail: 'bubbahubba'
  })
  expect(data).toEqual('Password too short')
})

test('7.3: Createaccount with no mail should return information missing message', () => {
  expect.assertions(1)
  var data = createAccount(
    {
      username: 'Hubba',
      password: 'hubbabubba',
      mail: ''
    }
  )
  expect(data).toEqual('Required information missing')
})
