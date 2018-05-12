let User = require('../../models/User')
let passwordHash = require('../auth/passwordHash')

module.exports = function (userData) {
  return new Promise(function (resolve, reject) {
    if (userData === undefined || userData === null ) {
      resolve('No user data recieved')
    }
    User.findById(userData._id, function (err, user) {
      if (err) { console.log(err) }
      user.set('username', userData.username)
      user.set('mail', userData.mail)
      user.set('role', userData.role)
      user.set('active', userData.active)
      if (userData.password.length > 5) {
        let hash = passwordHash(userData.password)
        user.set('password', hash)
      }
      user.save(function (err, doc) {
        if (err) { console.log(err) }
        resolve('User updated')
        console.log(doc)
      })
    })
  })
}
