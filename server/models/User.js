let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: String,
  joined: {type: Date, default: Date.now},
  bookCases: Array,
  googleSignIn: {type: Boolean, default: false},
  signedIn: Array
})

let User = mongoose.model('User', UserSchema)
module.exports = User
