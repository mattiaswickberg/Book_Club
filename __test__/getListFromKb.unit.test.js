/* global test, expect */
let getList = require('../server/lib/getListFromKb')

test('10.3: GetListFromKb should return object with empty array when provided with empty string', () => {
  expect.assertions(1)
  return getList('').then(data => {
    expect(data.list).toEqual([])
  })
})

test('10.2: GetListFromKb should return object with array when string contains spaces', () => {
  expect.assertions(1)
  return getList('Neil Gaiman Neverwhere').then(data => {
    expect(data.list.length).toBeGreaterThan(0)
  })
})

test('10.1: GetListFromKb should return object with array when search term is erronious', () => {
  expect.assertions(1)
  return getList('Neiql Garman Nevershere').then(data => {
    expect(data.list).toBeDefined()
  })
})
