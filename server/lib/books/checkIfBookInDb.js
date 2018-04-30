let Book = require('../../models/Book')

module.exports = function (isbn) {
  return new Promise(function (resolve, reject) {
    Book.findOne({isbn: isbn}).then(response => {
      if (response === null) {
        resolve('Book not in Db')
      } else if (response._id !== undefined) {
        resolve(response)
      } else {
        resolve('Book not in Db')
      }
    }).catch(err => console.log(err))
  })
}
