let Announcement = require('../../models/Announcement')

module.exports = function (message) {
  return new Promise(function (resolve, reject) {
    if (message.title === undefined || message.title === null) {
      resolve('Data missing')
    }

    let newAnnouncement = new Announcement({
      type: message.type,
      title: message.title,
      image: message.image,
      content: message.content,
      dateAdded: message.date,
      user: message.user
    })

    newAnnouncement.save(function (err, doc) {
      if (err) { console.log(err) }
      resolve('Annoucement saved')
    })
  })
}
