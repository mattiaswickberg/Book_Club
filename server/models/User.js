let mongoose = require('mongoose')
let passwordHash = require('../lib/auth/passwordHash')

let UserSchema = new mongoose.Schema({
  googleId: String,
  googleToken: String,
  username: {type: String, required: true},
  password: String,
  mail: String,
  joined: {type: Date, default: Date.now},
  role: {type: String, default: 'student'},
  image: String,
  active: {type: Boolean, default: true},
  recommendedBooks: [{
    book: {type: Object},
    fromUser: String,
    date: {type: Date, default: Date.now}
  }]
})

UserSchema.methods.validPassword = function (psw) {
  return (passwordHash(psw) === this.password)
}

let User = mongoose.model('User', UserSchema)
module.exports = User
