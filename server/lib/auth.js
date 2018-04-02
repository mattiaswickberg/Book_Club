let User = require('../models/User')
let passport = require('passport')
let GoogleStrategy = require('passport-google-oauth').Strategy

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err || !user) return done(err, null)
    done(null, user)
  })
})

module.exports = function (app, options) {

  if (!options.successRedirect) {
    options.successRedirect = '/account'
  }

  if (!options.failureRedirect) {
    options.failureRedirect = '/login'
  }

  return {
    init: function () {

      // Configure strategy
      passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback'
      },
    function (token, tokenSecret, profile, done) {
      let authId = 'google:' + profile.id
      User.findOne({authId: authId}, function (err, user) {
        if (err) return done(err, null)
        if (user) return done(null, user)

        user = new User({
          authId: authId,
          username: profile.displayName,
          joined: Date.now(),
          role: 'student'
        })
        user.save(function (err) {
          if (err) return done(err, null)
          done(null, user)
        })
      })
    }))
    },
    registerRoutes: function () {
      app.get('/auth/google', function (req, res, next) {
        if (req.query.redirect) {
          req.session.authRedirect = req.query.redirect
        }

        passport.authenticate('google', {
          scope: 'profile'
        })(req, res, next)
      })

      app.get('/auth/google/callback',
    passport.authenticate('google',
  {failureRedirect: options.failureRedirect}),
function (req, res) {
  let redirect = req.session.authRedirect
  if (redirect) delete req.session.authRedirect
  res.redirect(303, redirect || options.successRedirect)
})
    }
  }
}
