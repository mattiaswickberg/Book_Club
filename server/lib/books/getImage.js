const axios = require('axios')
module.exports = function (isbn) {
  return new Promise(function (resolve, reject) {
    let images = []
    // console.log(isbn)
    let url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'

    isbn.forEach(element => {
      if (element !== undefined) {
        axios
        .get(url + element)
        .then(response => {
          // console.log(response)
          if (response.data.items) {
            if (response.data.items[0].volumeInfo.imageLinks) {
              images.push(response.data.items[0].volumeInfo.imageLinks)
            }
          }
          resolve(images)
        })
        .catch(err => {
          console.log(err)
        })
      }
    })
  })
}
