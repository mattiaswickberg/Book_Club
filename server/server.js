// Initialise variables
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', function(req, res) {
    res.send('We all float down here')
})
app.listen(8081, function() {
    console.log('Server started on localhost:3000, press Crtl-C to terminate')
})