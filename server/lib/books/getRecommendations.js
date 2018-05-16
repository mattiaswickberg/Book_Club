let User = require('../../models/User')

module.exports = function (userID) {
  return new Promise(function (resolve, reject) {
    User.findById(userID, function (err, user) {
      if (err) { console.log(err) }
      resolve(user.get('recommendedBooks'))
    })
  })
}
