import {HTTP} from '@/services/Api'

const isLoggedInMixin = {
  created () {
  },
  methods: {
    checkIfLoggedIn () {
      return new Promise((resolve, reject) => {
        HTTP.get('/sessionstatus')
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

export default isLoggedInMixin
