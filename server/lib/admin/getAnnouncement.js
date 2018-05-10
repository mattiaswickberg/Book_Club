let Announcement = require('../../models/Announcement')

module.exports = function (id) {
  return new Promise(function (resolve, reject) {
    Announcement.findById(id, function (err, announcement) {
      if (err) { console.log(err) }
      resolve(announcement)
    })
  })
}
