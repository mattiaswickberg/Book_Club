// import mongoose and start database connection
var mongoose = require('mongoose')

module.exports = {
  initialize: function () {
    var db = mongoose.connection

// Handle connection error with database
    db.on('error', function () {
      console.log('We got a connection error')
    })

  // What happens database is connected
    db.once('open', function () {
      console.log('Database connected')
    })

  // Connect to database
    mongoose.connect(process.env.DB_ADDRESS)
  }
}
