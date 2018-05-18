import {HTTP} from '@/services/Api'

const fetchBookMixin = {
  created () {
  },
  methods: {
    fetchBook (bookId) {
      return new Promise((resolve, reject) => {
        HTTP.get('/book?' + 'bookID=' + bookId)
            .then(response => {
              resolve(response.data)
            })
            .catch(error => {
              reject(error.response.data)
            })
      })
    }
  }
}

export default fetchBookMixin
