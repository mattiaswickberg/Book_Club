// IP to live server: 159.89.99.112

// Initialise variables
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const app = express()
const passport = require('passport')

// Start database server
require('./lib/db').initialize()

// Middleware
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(require('cookie-parser')(process.env.COOKIE_SECRET))
app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(function (err, req, res, next) {
  console.log(err)
  next()
})

// Set up sessions ----------------------------------------------------

app.use(session({
  secret: process.env.COOKIE_SECRET,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: false,
  saveUninitialized: false
}))

// Flash messages
app.use(flash())

// Initialize authentication
require('./lib/auth/auth')
app.use(passport.initialize())
app.use(passport.session())

// Set CSP
app.use(function (req, res, next) {
  res.setHeader('Content-Security-Policy', 'script-src "self"')
  return next()
})

app.use(function (req, res, next) {
  if (req) { res.locals.user = req.session.userName }
  next()
})

// Import routes
require('./routes/authenticationRoutes')(app)
require('./routes/bookRoutes')(app)
require('./routes/adminRoutes')(app)
require('./routes/mainRoutes')(app)

app.listen(3000, function () {
  console.log('Server started on localhost:3000, press Crtl-C to terminate')
})
