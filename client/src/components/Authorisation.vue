<template>
  <div>
    <h1>
      Inloggningen lyckades!
    </h1>
    <router-link to="MainLoggedIn">
      <b-btn>Gå till huvudsidan</b-btn>
    </router-link>
  </div>
</template>

<script>
import {HTTP} from '@/services/Api'
import App from '@/App'
import router from '@/services/Api'
export default {
  data () {
    return {
      user: ''
    }
  },
  computed: {
  },
  created() {
  },
  
  mounted() {
    console.log(this.$route.query.user)
    HTTP.get('/user?userID=' + this.$route.query.user).then(response => {
      if(response !== null) {
        this.$session.start()
        this.$session.set('user', response)
        console.log('User logged in: ')
        console.log(this.$session.get('user'))
        this.$parent.$data.user = this.$session.get('user')
      }
    })
    if(this.$route.query.user !== null) {
      this.$session.start()
      this.$session.set('user', this.$route.query.user)
      console.log('User logged in: ')
      console.log(this.$session.get('user'))
      this.$parent.$data.user = this.$session.get('user')
    }
    this.$router.push('mainloggedin')
  }
}
</script>

<style lang="scss" scoped>

</style>
