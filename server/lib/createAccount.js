var User = require('../models/User')

// Set up password hashing
let bcrypt = require('bcrypt')
const saltRounds = 10

let createUser = function (data) {
  // Check mail and password
  if (data.password.length < 8) {
    return 'Password too short'
  } else if (data.mail.length === 0) {
    return 'Required information missing'
  } else if (!data.mail.includes('@') || !data.mail.includes('.')) {
    return 'Invalid mail address'
  }

  // Salt and hash password
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
