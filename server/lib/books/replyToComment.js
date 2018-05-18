let Book = require('../../models/Book')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    // Check data
    if (data.book === undefined || data.user === undefined || data.comment === undefined || data.reply === undefined) {
      resolve('Error in saving reply - data missing')
    }
    // Get book with correct id
    let query = Book.findById(data.book._id)
    // If book exists, and save reply to correct comment
    query.exec().then(function (doc) {
      if (doc.comments === undefined) { resolve('Error in saving reply - data missing') }
      if (doc.comments.length === 0) { resolve('Error in saving reply - data missing') }
      doc.comments.forEach(element => {
        if (element._id.toString() === data.comment) {
          element.replies.push({
            user: data.user.username,
            comment: data.reply
          })
        }
      })
      // Save updated book to database
      doc.save(function (err, savedDoc) {
        if (err) {
          console.log(err)
          resolve('Error in saving reply')
        } else {
          resolve('Reply saved')
        }
      })
    })
  })
}
