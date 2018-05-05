let Book = require('../../models/Book')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    if (data === undefined || data === null) {
      resolve('No data found')
    }
    if (data.bookID === undefined) {
      resolve('Book ID missing')
    }
    if (data.comment === undefined) {
      resolve('No comment found')
    }
    if (data.comment.length < 1) {
      resolve('No comment found')
    }
    let comment = {
      user: data.user.username,
      comment: data.comment
    }
    let query = Book.findById(data.bookID)
    query.exec().then(function (doc) {
      let comments = doc.get('comments')
      comments.push(comment)
      doc.set('comments', comments)
      doc.save(function (err, doc) {
        if (err) { resolve(err) }
        resolve('Comment saved')
      })
    })
  })
}
