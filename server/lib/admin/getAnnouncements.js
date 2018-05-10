let Announcement = require('../../models/Announcement')

module.exports = function () {
  return new Promise(function (resolve, reject) {
    Announcement.find({}, function (err, announcements) {
      if (err) { console.log(err) }
      resolve(announcements)
    })
  })
}
