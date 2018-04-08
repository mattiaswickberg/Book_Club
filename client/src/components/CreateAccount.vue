<template>
<div>
  <form id='createAccount' @submit.prevent="sendForm">
    <div class='form-group'>
      <label for='username'>Användarnamn</label>
      <input type='string' v-model="user.username" class='form-control' placeholder='Det namn som visas i applikationen'>
    </div>
      <div class='form-group'>
        <label for='main'>Mailadress</label>
        <input type='email' v-model='user.mail' class='form-control' placeholder='Fyll i din mailadress'>
      </div>
      <div class='form-group'>
        <label for='password'>Password</label>
        <vue-password v-model="user.password"
                    classes="input"
                    :user-inputs="[user.email]"
      >
      </vue-password>
        <!-- 
        <input type='password' v-model='user.password' class='form-control' placeholder='Lösenord' required> -->
      </div>
      <button type='submit' class='btn btn-primary'>Skapa konto</button>
  </form>
</div>
</template>

<script>
import {HTTP} from '@/services/Api'
import VuePassword from 'vue-password'
import router from '@/router/index'
export default {
  components: {
    VuePassword
  },
  data () {
    return {
      user: {
      username: '',
      password: '',
      mail: ''
      }
      }
    },
  methods: {

     sendForm: function () {
      console.log('Adding user')
      return HTTP.post('createaccount', this.user)
      .then( function (response) {
        console.log(response)
        if(response) {
          router.push('account')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

#createAccount {
  background-color: hsla(279, 56%, 31%, 0.75);
  color: white;
}
</style>
