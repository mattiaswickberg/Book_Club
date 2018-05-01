let User = require('../../models/User')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    // Check if user is valid
    let user = JSON.parse(data.user)

    if (user._id === undefined) {
      console.log('No user to remove')
      resolve('Account could not be removed')
    }
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
