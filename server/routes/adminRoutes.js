let createAnnouncement = require('../lib/admin/createAnnouncement')
let getAnnouncements = require('../lib/admin/getAnnouncements')
let getAnnouncement = require('../lib/admin/getAnnouncement')
let archiveAnnouncement = require('../lib/admin/archiveAnnouncement')
let getUsers = require('../lib/admin/getUsers')
let getUser = require('../lib/admin/getUser')
let updateUser = require('../lib/admin/updateUser')

module.exports = function (app) {
  // Get an array of all users in database
  app.get('/users', function (req, res) {
    getUsers()
    .then(response => {
      res.send(response)
    })
    .catch(err => { console.log(err) })
  })

  // Get user from database and return to client
  app.get('/user', function (req, res) {
    getUser(req.query.id)
    .then(response => {
      res.send(response)
    })
    .catch(err => { console.log(err) })
  })

  // Update existing user
  app.post('/updateuser', function (req, res) {
    updateUser(req.body).then(response => {
      console.log(response)
    })
  })

  // Save new announcement to database
  app.post('/announcement', function (req, res) {
    createAnnouncement(req.body)
    .then(response => {
      console.log(response)
      res.send(response)
    })
    .catch(err => { console.log(err) })
  })

  // Get all announcements from db and return to client
  app.get('/announcements', function (req, res) {
    getAnnouncements()
    .then(response => {
      res.send(response)
    })
    .catch(err => { console.log(err) })
  })

  // Get specific announcement from db and return to client
  app.get('/announcement', function (req, res) {
    getAnnouncement(req.query.id)
    .then(response => {
      res.send(response)
    })
    .catch(err => { console.log(err) })
  })

  // set archive variable to true for specific announcement
  app.post('/archiveannouncement', function (req, res) {
    archiveAnnouncement(req.body)
    .then(response => {
      res.send(response)
    })
  })
}
