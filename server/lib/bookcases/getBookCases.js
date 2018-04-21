let Bookcase = require('../../models/BookCase')
module.exports = function (userID) {
  return new Promise(function (resolve, reject) {
    // console.log('Finding book case: ' + userID)
    if (typeof userID !== 'string') {
      resolve('Not a valid userID')
    } else {
      let query = (Bookcase.find({user: userID}))
      query.exec().then(response => {
        // console.log('response is: ' + response)
        let cases = []
        response.forEach(element => {
          let books = element.books.filter(function (item) {
            return item !== null
          })
          element.books = books
          cases.push(element)
        })
        // console.log(cases)
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
