let createAnnouncement = require('../lib/admin/createAnnouncement')
let getAnnouncements = require('../lib/admin/getAnnouncements')
let getAnnouncement = require('../lib/admin/getAnnouncement')
let archiveAnnouncement = require('../lib/admin/archiveAnnouncement')

module.exports = function (app) {
  app.post('/announcement', function (req, res) {
    createAnnouncement(req.body)
    .then(response => {
      console.log(response)
      res.send(response)
    })
    .catch(err => { console.log(err) })
  })

  app.get('/announcements', function (req, res) {
    getAnnouncements()
    .then(response => {
      res.send(response)
    })
    .catch(err => { console.log(err) })
  })

  app.get('/announcement', function (req, res) {
    getAnnouncement(req.query.id)
    .then(response => {
      res.send(response)
    })
    .catch(err => { console.log(err) })
  })

  app.post('/archiveannouncement', function (req, res) {
    archiveAnnouncement(req.body)
    .then(response => {
      res.send(response)
    })
  })
}
