/* global describe, it */
var assert = require('assert')
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})

/* global test, expect

let  = require('../server/lib/')

test('', () => {
  expect.assertions(1)
  getBookCases()
  .then(response => {
    console.log(response)
    expect(response).toEqual('Not a valid userID')
  })
}) */
