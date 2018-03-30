let getBooksFromKb = function (searchString) {
  return new Promise(function (resolve, reject) { 
  const axios = require('axios')
  let books = {
    'list': [],
    'count': 0
  }

  if (searchString.length === 0) {
    resolve(books)
  } else if (searchString.includes(' ')) {
    searchString = searchString.replace(' ', '+')
  }

  const url = 'https://libris.kb.se/xsearch?query=' + searchString + '&format=json&n=100'

  axios
  .get(url)
  .then(response => {
    if (response.data.xsearch !== undefined) {
      var json = response.data.xsearch
    books.count = json.records
    json.list.forEach(element => {
      books.list.push(element)
    })
    }
    resolve(books)
  })
  .catch(error => {
    reject(error)
    console.log(error)
  })
  })
}

module.exports = getBooksFromKb
