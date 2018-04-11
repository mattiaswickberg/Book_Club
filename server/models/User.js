let mongoose = require('mongoose')
let passwordHash = require('../lib/auth/passwordHash')

let UserSchema = new mongoose.Schema({
  googleId: String,
  googleToken: String,
  username: {type: String, required: true},
  password: String,
  mail: String,
  joined: {type: Date, default: Date.now},
  bookCases: Array,
  signedIn: Array,
  role: {type: String, default: 'student'},
  image: String
})

UserSchema.methods.validPassword = function (psw) {
  return (passwordHash(psw) === this.password)
}

let User = mongoose.model('User', UserSchema)
module.exports = User
