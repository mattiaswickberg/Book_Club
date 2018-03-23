// Initialize variables
// -------------------------------------------

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())

// Set up Vue

// Serve public files

// Configure CSP

// Get routes
require('./routes/routes')(app)
// Start server
app.listen(3000, function () {
  console.log('Server started on port 3000; press Ctrl-C to terminate')
})
