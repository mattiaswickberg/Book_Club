import {HTTP} from '@/services/Api'

const fetchBooksMixin = {
  created () {
  },
  methods: {
    fetchBooks (bookCaseId) {
      return new Promise((resolve, reject) => {
        HTTP.get('/books', bookCaseId)
            .then(response => {
              console.log(response)
              resolve(response.data)
            })
            .catch(error => {
              reject(error.response.data)
            })
      })
    }
  }
}

export default fetchBooksMixin
