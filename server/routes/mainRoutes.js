// Import other stuff
let User = require('../models/User')
let createAccount = require('../lib/createAccount')
let passport = require('passport')

// Main routes
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.html')
  })

  // Account creation and login routes
  app.post('/createaccount', function (req, res) {
    console.log('Recieved data')
    console.log(req.body)
    // create user based on information and save to database
    User.find({username: req.body.username}).then(function (data) {
      if (data.length > 0) {
        req.session.flash = {
          type: 'danger',
          intro: 'Username taken',
          message: 'The username you wanted is unfortunately not available'
        }
        res.redirect(303, '/')
      } else {
        User.find({mail: req.body.mail}).then(function (data) {
          if (data.length > 0) {
            req.session.flash = {
              type: 'danger',
              intro: 'mail already used',
              message: 'There is already an account with that email address'
            }
            res.redirect(303, '/')
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

  // Authentication with google

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.get('/auth/google/callback',
passport.authenticate('google', {
  successRedirect: '/account',
  failureRedirect: '/auth'
}))

  app.get('/account', function (req, res) {
    if (!req.user) return res.redirect(303, '/unauthorised')
    res.render('account', {
      username: req.user.name
    })
  })

  // Usual routes
  app.get('/unauthorised',
function (req, res) {
  console.log('403')
  res.status('403').redirect('/')
})

  app.use(function (req, res, next) {
    console.log('404')
    res.status(404)
    res.redirect('/')
  })

  app.use(function (err, req, res, next) {
    console.log('500')
    console.error(err.stack)
    res.status(500)
    res.redirect('/')
  })
}
