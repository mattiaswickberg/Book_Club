let Announcement = require('../../models/Announcement')

module.exports = function (id) {
  return new Promise(function (resolve, reject) {
    Announcement.findById(id.id, function (err, doc) {
      console.log(id)
      if (err) { console.log(err) }
      console.log(doc)
      doc.set('archived', true)
      doc.save(function (err, doc) {
        if (err) { console.log(err) }
        resolve('Announcement archived')
      })
    })
  })
}
