import {HTTP} from '@/services/Api'

const fetchBookCaseMixin = {
  created () {
  },
  methods: {
    fetchBookCase (bookCaseId) {
      return new Promise((resolve, reject) => {
        HTTP.get('/bookcase?' + 'caseID=' + bookCaseId)
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

export default fetchBookCaseMixin
