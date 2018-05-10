let User = require('../../models/User')

module.exports = function () {
  return new Promise(function (resolve, reject) {
    User.find({}, function (err, users) {
      if (err) { console.log(err) }
      resolve(users)
    })
  })
}
