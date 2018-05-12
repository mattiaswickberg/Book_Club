let BookCase = require('../../models/BookCase')

module.exports = function (id) {
  return new Promise(function (resolve, reject) {
    if (id === undefined || id === null) { resolve('No bookcase ID found') }
    BookCase.findByIdAndRemove(id.id, function (err, doc) {
      if (err) { console.log(err) }
      resolve('Bookcase removed')
    })
  })
}
