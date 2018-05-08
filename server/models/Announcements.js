let mongoose = require('mongoose')

let AnnouncementSchema = new mongoose.Schema({
  type: String,
  title: String,
  image: String,
  content: String,
  dateAdded: {type: Date, default: Date.now},
  user: {type: String, default: 'Admin'}
})

let Announcement = mongoose.model('Announcement', AnnouncementSchema)

module.exports = Announcement
