// IP to live server: 159.89.99.112

// Initialise variables
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const app = express()

// Middleware
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(require('cookie-parser')(process.env.COOKIE_SECRET))

// Start database server
require('./lib/db').initialize()

// Set CSP
app.use(function (req, res, next) {
  res.setHeader('Content-Security-Policy', 'script-src "self"')
  return next()
})

app.get('/', function (req, res) {
  res.send('We all float down here')
})

app.post('/createaccount', function (req, res) {
  console.log('Recieved data')
  console.log(req.body)
  // create user based on information and save to database

  // implement csrf!
})

app.listen(3000, function () {
  console.log('Server started on localhost:3000, press Crtl-C to terminate')
})
