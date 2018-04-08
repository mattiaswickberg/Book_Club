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
              resolve(response.data.user)
            })
            .catch(error => {
              reject(error.response.data)
            })
      })
    }
  }
}

export default isLoggedInMixin
