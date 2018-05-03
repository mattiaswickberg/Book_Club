let User = require('../../models/User')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    console.log(data)
  // Check if data contains all valid information
    if (data.user === undefined || data.book === undefined || data.toUser === undefined) {
      resolve('Could not recommend book due to missing information')
    }

  // Check if user exists

  // Add book to recommended books
  })
}
