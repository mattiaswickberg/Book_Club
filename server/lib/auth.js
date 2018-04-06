let User = require('../models/User')
let passport = require('passport')
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'googleId': profile.id }, function (err, user) {
        if (err) return done

        if (user) {
          console.log('User logged in with Google')
          return done(null, user)
        } else {
          // create new user
          console.log('Creating new user')
          var newUser = new User()

          newUser.googleId = profile.id
          newUser.googleToken = accessToken
          newUser.username = profile.displayName
          newUser.mail = profile.emails[0].value
          // newUser.image = profile...

          newUser.save(function (err) {
            if (err) throw err
            console.log('New user created')
            return done(null, newUser)
          })
        }
      })
    })
  }
))
