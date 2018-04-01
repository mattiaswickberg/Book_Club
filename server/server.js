// IP to live server: 159.89.99.112

// Initialise variables
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

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
