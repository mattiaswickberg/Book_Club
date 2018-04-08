let User = require('../models/User')
let passwordHash = require('./passwordHash')

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
  let hash = passwordHash(data.password)
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
}

module.exports = createUser
