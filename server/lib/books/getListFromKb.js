let consolidateBookVersions = require('./consolidateBooks')
// Take search string and make https request to KB's API
let getBooksFromKb = function (searchString) {
  return new Promise(function (resolve, reject) {
    const axios = require('axios')
    let books = { // Initialise list to be returned after request
      'list': [],
      'count': 0
    }

    if (searchString === undefined || searchString.length === 0) {
      resolve(books) // return empty search result is search string is empty
    } else if (searchString.includes(' ')) { // replace any spaces in search string with pluses
      searchString = searchString.replace(' ', '+')
    }

    // Construct url for request
    const url = 'https://libris.kb.se/xsearch?query=' + searchString + '&format=json&n=100&order=-chronological'

    axios
  .get(url)
  .then(response => {
    if (response.data.xsearch !== undefined) {
      var json = response.data.xsearch // Get data from response
      books.count = json.records // Save search count into return object
      json.list.forEach(element => {
        books.list.push(element) // Save resulting books into return array
      })
    }
    consolidateBookVersions(books.list).then(response => {
      books.list = response
    })
    resolve(books) // Return result of search
  })
  .catch(error => {
    reject(error)
    console.log(error)
  })
  })
}

module.exports = getBooksFromKb
