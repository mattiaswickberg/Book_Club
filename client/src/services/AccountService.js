import Api from '@/services/Api'

export default {
  createAccount (params) {
    return Api().post('createaccount', params)
  }
}
