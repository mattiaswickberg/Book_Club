let Bookcase = require('../../models/BookCase')
module.exports = function (userID) {
  return new Promise(function (resolve, reject) {
    if (typeof userID !== 'string') {
      resolve('not a valid userID')
    } else {
      Bookcase.find({user: userID}).then(response => {
        resolve(response)
      })
    }
  })
}
