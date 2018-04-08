import {HTTP} from '@/services/Api'

const isLoggedInMixin = {
  created () {
    console.log('Authenticating')
  },
  methods: {
    checkIfLoggedIn () {
      return new Promise((resolve, reject) => {
        HTTP.get('/sessionstatus')
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

export default isLoggedInMixin
