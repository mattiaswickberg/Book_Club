let Bookcase = require('../../models/BookCase')

module.exports = function (BookCaseId) {
  if (typeof BookCaseId !== 'string') {
    return null
  } else {
    Bookcase.findById(BookCaseId, function (err, bcase) {
      if (err) { console.log(err) } else {
        return bcase
      }
    })
  }
}
