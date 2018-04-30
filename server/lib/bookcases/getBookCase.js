let Bookcase = require('../../models/BookCase')

module.exports = function (BookCaseId) {
  return new Promise(function (resolve, reject) {
    if (typeof BookCaseId !== 'string') {
      resolve('Not a valid user ID')
    } else {
      Bookcase.findById(BookCaseId, function (err, bcase) {
        if (err) { resolve(err) } else {
          resolve(bcase)
        }
      })
    }
  })
}
