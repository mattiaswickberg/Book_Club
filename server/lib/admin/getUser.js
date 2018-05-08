let User = require('../../models/User')

module.exports = function (userID) {
  return new Promise(function (resolve, reject) {
    User.findById(userID).then(response => {
      if (response !== null) {
        resolve(response)
      } else { resolve('User not found') }
    }).catch(err => { console.log(err) })
  })
}
