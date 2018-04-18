let Bookcase = require('../../models/BookCase')
let getBooks = require('../books/getBooks')
module.exports = async function (userID) {
  if (typeof userID !== 'string') {
    return null
  } else {
    let cases = []
    await Bookcase.find({user: userID}).then(async response => {
      // console.log(response)
    await response.forEach(async element => {
      let bcase = {case: {}, books: []}
        // console.log('bookcase')
        // console.log(element)
      if (element._id !== null || element._id !== undefined) {
        bcase.case = element
        bcase.books.push(await getBooks(element._id))
        cases.push(bcase)
        console.log(bcase)
      }
    })
    console.log('Cases: ')
    console.log(cases)
    return (cases)
  })
  }
}
