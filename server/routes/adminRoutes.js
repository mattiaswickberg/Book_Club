let createAnnouncement = require('../lib/admin/createAnnouncement')

module.exports = function (app) {
  app.post('/announcement', function (req, res) {
    createAnnouncement(req.body)
    .then(response => {
      console.log(response)
      res.send(response)
    })
    .catch(err => { console.log(err) })
  })
}
