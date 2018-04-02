var User = require('../models/User')

// Set up password hashing
let bcrypt = require('bcrypt')
const saltRounds = 10

let createUser = function (data) {
  // salt and hash password
  bcrypt.hash(data.password, saltRounds).then(function (hash) {
     // Create new user from form data
    let newUser = new User({
      username: data.username,
      password: hash,
      mail: data.mail
    })
    // save new user to database
    newUser.save(function (error) {
      if (error) {
        console.log('User error: ')
        console.log(error)
      }
    })
  })
}

module.exports = createUser
