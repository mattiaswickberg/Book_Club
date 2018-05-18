let Bookcase = require('../../models/BookCase')
module.exports = function (userID) {
  return new Promise(function (resolve, reject) {
    if (typeof userID !== 'string') {
      resolve('Not a valid userID')
    } else {
      let query = (Bookcase.find({user: userID}))
      query.exec().then(response => {
        let cases = []
        response.forEach(element => {
          let books = element.books.filter(function (item) {
            return item !== null
          })
          element.books = books
          cases.push(element)
        })
        resolve(cases)
      })
      .catch(err => {
        console.log('Error')
        console.log(err)
        resolve('Invalid ID')
      })
    }
  })
}
