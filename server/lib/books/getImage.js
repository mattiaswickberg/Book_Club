const axios = require('axios')
module.exports = function (isbn) {
  return new Promise(function (resolve, reject) {
    let images = []
    console.log(isbn)
    let url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'

    isbn.forEach(element => {
      axios
      .get(url + element)
      .then(response => {
        // console.log(response)
        if (response.data.items[0].volumeInfo.imageLinks) {
          images.push(response.data.items[0].volumeInfo.imageLinks)
        } else {
          images.push({
            smallThumbnail: './assets/blank-book-cover.jpg',
            thumbnail: './assets/blank-book-cover.jpg'
          })
        }
        resolve(images)
      })
      .catch(err => {
        console.log(err)
      })
    })
  })
}
