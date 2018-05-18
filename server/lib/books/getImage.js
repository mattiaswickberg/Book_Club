const axios = require('axios')
module.exports = function (isbn) {
  return new Promise(function (resolve, reject) {
    let images = []
    // URL for google books API, search by isbn
    let url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'

    // Make array of promises for api calls
    let promises = []

    isbn.forEach(element => {
      if (element !== undefined) {
        promises.push(
        axios
        .get(url + element)
        .then(response => {
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
    // If no images were found, add placeholder image, otherwise resolve promise with array of images
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
