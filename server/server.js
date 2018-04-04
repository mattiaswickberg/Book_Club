// IP to live server: 159.89.99.112

// Initialise variables
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const app = express()

// Middleware
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(require('cookie-parser')(process.env.COOKIE_SECRET))

app.use(express.static(path.join(__dirname, '../client/dist')))

// Start database server
require('./lib/db').initialize()

// Initialize authentication

require('./lib/auth')

const auth = require('./lib/auth')(app, {
  providers: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }
  },
  successRedirect: '/',
  failureRedirect: '/unauthorised'
})
auth.init()
auth.registerRoutes()

// Set CSP
app.use(function (req, res, next) {
  res.setHeader('Content-Security-Policy', 'script-src "self"')
  return next()
})

// Set up sessions ----------------------------------------------------

app.use(session({
  secret: process.env.COOKIE_SECRET,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: false,
  saveUninitialized: false
}))
// CSRF handling
/* let csurf = require('csurf')

app.use(function (req, res, next) {
  res.locals._csrfToken = req.csrfToken()
  next()
})
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  console.log(err)
  res.status(403)
  res.render('403')
})
 */
// Flash messages
app.use(function (req, res, next) {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})

app.use(function (req, res, next) {
  if (req) { res.locals.user = req.session.userName }
  next()
})

// Import routes

require('./routes/mainRoutes')(app)

app.listen(3000, function () {
  console.log('Server started on localhost:3000, press Crtl-C to terminate')
})
