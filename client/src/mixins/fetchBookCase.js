import {HTTP} from '@/services/Api'

const fetchBookCaseMixin = {
  created () {
    console.log('Authenticating')
  },
  methods: {
    fetchBookCase (bookCaseId) {
      return new Promise((resolve, reject) => {
        HTTP.get('/bookcases', bookCaseId)
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

export default fetchBookCaseMixin
