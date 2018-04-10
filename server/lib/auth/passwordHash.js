let bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = function (password) {
  let pw = ''
  bcrypt.hash(password, saltRounds).then(function (hash) {
    pw = hash
  })
  return pw
}
