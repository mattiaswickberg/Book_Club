let User = require('../../models/User')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    // console.log(data)
  // Check if data contains all valid information
    if (data.user === undefined || data.book === undefined || data.toUser === undefined) {
      resolve('Could not recommend book due to missing information')
    }

  // Check if user exists
    User.findOne({
      $or: [
        {'username': data.toUser},
        {'mail': data.toUser}
      ]
    }).then(user => {
      if (user === null || user === undefined) {
        resolve('User not found')
      }
      console.log('User is:')
      console.log(user)
      // Add book to recommended books
      let recommendedBooks = user.get('recommendedBooks')
      recommendedBooks.push({
        book: data.book,
        fromUser: data.user.username
      })
      user.set('recommendedBooks', recommendedBooks)
      user.save(function (err, doc) {
        if (err) { console.log(err) }
        console.log('Saving user')
        console.log(doc)
        resolve('Recommendation sent')
      })
    }).catch(err => { console.log(err) })
  })
}
