let mongoose = require('mongoose')

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

let User = mongoose.model('User', UserSchema)
module.exports = User
