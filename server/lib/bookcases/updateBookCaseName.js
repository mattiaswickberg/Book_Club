let BookCase = require('../../models/BookCase')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    if (data === undefined || data === null) { resolve('No data recieved') }
    if (data.id === undefined || data.newName === undefined) { resolve('Mandatory information missing') }
    if (data.newName.length === 0) { resolve('No new name recieved') }
    BookCase.findById(data.id, function (err, bookCase) {
      if (err) { console.log(err) }
      bookCase.set('title', data.newName)
      bookCase.save(function (err, doc) {
        if (err) { console.log(err) }
        resolve('Bookcase updated')
      })
    })
  })
}