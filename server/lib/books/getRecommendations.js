let User = require('../../models/User')

module.exports = function (userID) {
  return new Promise(function (resolve, reject) {
    // Find user with given ID and return the recommendations for that user
    User.findById(userID, function (err, user) {
      if (err) { console.log(err) }
      resolve(user.get('recommendedBooks'))
    })
  })
}
