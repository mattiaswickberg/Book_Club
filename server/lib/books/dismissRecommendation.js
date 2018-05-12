let User = require('../../models/User')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    if (data === undefined || data === null) {
      resolve('Missing required data')
    }
    User.findById(data.user, function (err, user) {
      if (err) { console.log(err) }
      let recList = user.get('recommendedBooks')
      console.log(recList)
      recList.forEach(element => {
        if (element.book._id === data.bookID) {
          recList.splice(recList.indexOf(element), 1)
        }
      })
      user.set('recommendedBooks', recList)
      user.save(function (err, doc) {
        if (err) { console.log(err) }
        resolve('Recommendation removed')
      })
    })
  })
}
