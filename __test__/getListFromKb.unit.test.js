/* global test, expect */
let getList = require('../server/lib/getListFromKb')

test('getListFromKb should return object with empty array when provided with empty string', () => {
  expect.assertions(1)
  return getList('').then(data => {
    expect(data.list).toEqual([])
  })
})

test('getListFromKb should return object with array when string contains spaces', () => {
  expect.assertions(1)
  return getList('Neil Gaiman Neverwhere').then(data => {
    expect(data.list.length).toBeGreaterThan(0)
  })
})
