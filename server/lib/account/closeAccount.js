let User = require('../../models/User')
let mongoose = require('mongoose')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    if (data === undefined || data === null) {
      resolve('No user data provided')
    }
    // Check if user is valid
    let user = JSON.parse(data.user)

    if (user._id === undefined) {
      resolve('Account could not be removed')
    }

    if (!mongoose.Types.ObjectId.isValid(user._id)) { resolve('Not a valid userID') }
    // Remove user from database
    User.findOneAndRemove({_id: user._id}, function (err, doc) {
      if (err) {
        console.log('error')
        console.log(err)
        resolve('Account could not be removed')
      }
      if (doc) {
        console.log('Removed' + doc)
        resolve('Account removed')
      }
    })
  })
}
