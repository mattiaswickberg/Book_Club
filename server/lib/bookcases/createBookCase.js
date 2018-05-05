let BookCase = require('../../models/BookCase')
let User = require('../../models/User')

module.exports = function (username, title) {
  if (username === undefined || username === null) { return 'Username missing' }
  if (title === undefined || title === null) { return 'Title for bookcase missing' }
  User.findOne({username: username}, function (err, user) {
    if (err) return err
    let newBookCase = new BookCase({
      user: user._id,
      title: title
    })

    newBookCase.save(function (error) {
      if (error) {
        console.log(error)
      }
    })
  })
}
