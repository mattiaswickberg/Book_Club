let Bookcase = require('../../models/BookCase')
module.exports = function (userID) {
  return new Promise(function (resolve, reject) {
    if (typeof userID !== 'string') {
      resolve('not a valid userID')
    } else {
      Bookcase.find({user: userID}).then(response => {
        console.log(response)
        let cases = []
        response.forEach(element => {
          let books = element.books.filter(function (item) {
            return item !== null
          })
          element.books = books
          cases.push(element)
        })
        console.log(cases)
        resolve(cases)
      })
    }
  })
}
