let mongoose = require('mongoose')

let AnnouncementSchema = new mongoose.Schema({
  type: {type: String, default: 'regular'},
  title: String,
  image: String,
  content: String,
  dateAdded: {type: Date, default: Date.now},
  user: {type: String, default: 'Admin'},
  archived: {type: Boolean, default: false}
})

let Announcement = mongoose.model('Announcement', AnnouncementSchema)

module.exports = Announcement
