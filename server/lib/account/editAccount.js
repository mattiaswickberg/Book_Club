let User = require('../../models/User')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    if (data.user === undefined || data.newUsername === undefined || data.newMail === undefined) {
      resolve('Can\'t make changes')
    } else {
        // Check if username is taken
      User.find({username: data.newUsername}).then(function (doc) {
        if (doc.length > 0) {
          if (doc[0]._id !== data.user._id) {
            resolve('Username already in use')
          }
        } else {
          User.findByIdAndUpdate(data.user._id, {
            username: data.newUsername,
            mail: data.newMail
          }, function (err, doc) {
            if (err) { console.log(err) }
            resolve('Account updated')
          })
        }
      })
    }
  })
}
