import {HTTP} from '@/services/Api'

const fetchBookCasesMixin = {
  created () {
    console.log('Authenticating')
  },
  methods: {
    fetchBookCases (userId) {
      return new Promise((resolve, reject) => {
        HTTP.get('/bookcases', userId)
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

export default fetchBookCasesMixin
