let Book = require('../../models/Book')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    // Check data
    if (typeof data.bookID !== 'string') { resolve('Not a valid book ID') }
    if (data.rating < 0 || data.rating > 10) { resolve('Rating must be between 0 and 10') }
    // Get book from database
    let query = Book.findById(data.bookID)
    query.exec().then(doc => {
      let ratings = doc.get('ratings')
      // Check if user already rated book
      ratings.forEach(element => {
        if (element.user === data.userID) {
          ratings.splice(ratings.indexOf(element), 1)
        }
      })
      // Add new rating
      ratings.push({
        user: data.userID,
        rating: data.rating
      })
      doc.set('ratings', ratings)
      // Save book to database
      doc.save(function (err, doc) {
        if (err) { resolve(err) }
        resolve('rating saved')
      })
    })
  })
}
