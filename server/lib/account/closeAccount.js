let User = require('../../models/User')

module.exports = function (user) {
  return new Promise(function (resolve, reject) {
    // Check if user is valid
    if (user._id === undefined) { resolve('Account could not be removed') }
    // Remove user from database
    User.findByIdAndRemove(user._id, function (err, doc) {
      if (err) {
        console.log(err)
        resolve('Account could not be removed')
      }
      if (doc) {
        resolve('Account removed')
      }
    })
  })
}
