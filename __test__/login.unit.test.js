/* global test, expect */

let login = require('../server/lib/')

test('31.1: Login med fel lösenord ska returnera den informationen', () => {
  expect.assertions(1)
  var data = login({
    username: 'Hubba',
    password: 'bubba',
  })
  expect(data).toEqual('Wrong password')
  })

  test('31.2: Login med fel username ska returnera den informationen', () => {
    expect.assertions(1)
    var data = login({
      username: 'usyadfgjd',
      password: 'bubba',
    })
    expect(data).toEqual('User does not exist')
    })
  