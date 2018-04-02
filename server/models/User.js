let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  authId: String,
  username: {type: String, required: true},
  password: String,
  mail: String,
  joined: {type: Date, default: Date.now},
  bookCases: Array,
  googleSignIn: {type: Boolean, default: false},
  signedIn: Array,
  role: {type: String, default: 'student'}
})

let User = mongoose.model('User', UserSchema)
module.exports = User
