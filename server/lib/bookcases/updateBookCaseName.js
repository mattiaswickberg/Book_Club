let BookCase = require('../../models/BookCase')

module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    // Check if a new name was provided, as well as id for bookcase
    if (data === undefined || data === null) { resolve('No data recieved') }
    if (data.id === undefined || data.newName === undefined) { resolve('Mandatory information missing') }
    if (data.newName.length === 0) { resolve('No new name recieved') }
    // Get desired bookcase
    BookCase.findById(data.id, function (err, bookCase) {
      if (err) { console.log(err) }
      // Set new title and save to db
      bookCase.set('title', data.newName)
      bookCase.save(function (err, doc) {
        if (err) { console.log(err) }
        resolve('Bookcase updated')
      })
    })
  })
}