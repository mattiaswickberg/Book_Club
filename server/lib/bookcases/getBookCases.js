let Bookcase = require('../../models/BookCase')
module.exports = function (userID) {
  return new Promise(function (resolve, reject) {
    Bookcase.find({user: userID}).then(response => {
      resolve(response)
    })
    .catch(err => {
      reject(err)
    })
  })
}
