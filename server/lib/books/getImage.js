const axios = require('axios')
module.exports = function (isbn) {
  return new Promise(function (resolve, reject) {
    let images = []
    // console.log(isbn)
    let url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'

    let promises = []

    isbn.forEach(element => {
      if (element !== undefined) {
        promises.push(
        axios
        .get(url + element)
        .then(response => {
          // console.log(response)
          if (response.data.items) {
            if (response.data.items[0].volumeInfo.imageLinks !== undefined) {
              images.push(response.data.items[0].volumeInfo.imageLinks)
            }
          }
        })
        .catch(err => {
          console.log(err)
        }))
      }
    })
    Promise.all(promises).then(data => {
      if (images.length === 0) {
        images.push({
          smallThumbnail: '/static/blank-book-cover-small.png',
          thumbnail: '/static/blank-book-cover.png'
        })
      }
      resolve(images)
    })
  })
}
