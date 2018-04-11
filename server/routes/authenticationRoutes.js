let passport = require('passport')
let User = require('../models/User')
let createAccount = require('../lib/auth/createAccount')

module.exports = function (app) {
  // Account creation and login routes
  app.post('/createaccount', function (req, res) {
    console.log('Recieved data')

    // create user based on information and save to database
    User.find({username: req.body.username}).then(function (data) {
      if (data.length > 0) {
        var flash = {
          type: 'danger',
          intro: 'Username taken',
          message: 'The username you wanted is unfortunately not available'
        }
        res.send(flash)
      } else {
        User.find({mail: req.body.mail}).then(function (data) {
          if (data.length > 0) {
            var flash = {
              type: 'danger',
              intro: 'mail already used',
              message: 'There is already an account with that email address'
            }
            res.send(flash)
          } else {
            createAccount(req.body)
            req.session.flash = {
              intro: 'User account created',
              message: 'Welcome to SSIS book club! You can now login with your username and password.'
            }
            res.redirect(303, '/')
          }
        })
      }
    })
  })

  // Login with username/password
  app.post('/login',
passport.authenticate('local', { failureRedirect: '/' }),
function (req, res) {
  res.redirect('http://localhost:3000/#/account')
})

  // Authentication with google

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.get('/auth/google/callback',
passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/#/account',
  failureRedirect: '#/auth'
}))

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })
}
