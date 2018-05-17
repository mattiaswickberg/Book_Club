let passport = require('passport')
let User = require('../models/User')
let createAccount = require('../lib/auth/createAccount')
let editAccount = require('../lib/account/editAccount')
let closeAccount = require('../lib/account/closeAccount')
let getUser = require('../lib/admin/getUser')

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
  app.post('/login', function (req, res, next) {
    console.log(req.headers)
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        console.log(err)
        return next(err)
      }
      if (!user) { res.send(info) }
      res.send(user)
    })(req, res, next)
  }
)

  // Authentication with google

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.get('/auth/google/callback',
passport.authenticate('google', {failureRedirect: '/'}), function (req, res) {
  console.log('User: ')
  console.log(req.user)
  res.redirect(303, process.env.SERVER_URL + '/#/auth?user=' + req.user._id)
})

  app.get('/logout', function (req, res) {
    req.logout()
    res.status(200).send('logged out')
  })

  app.delete('/user', function (req, res) {
    console.log('Deleting user: ')
    console.log(req.query)
    closeAccount(req.query).then(response => {
      if (response === 'Account could not be removed') {
        res.send(response)
      } else if (response === 'Account removed') {
        res.send(response)
      } else {
        res.redirect(303, '/')
      }
    }).catch(err => console.log(err))
  })

  app.post('/editaccount', function (req, res) {
    console.log('Making som changes: ')
    console.log(req.body)
    editAccount(req.body).then(response => {
      res.send(response)
    }).catch(err => console.log(err))
  })

  app.get('/user', function (req, res) {
    getUser(req.query.userID).then(response => {
      res.send(response)
    })
  })
}
