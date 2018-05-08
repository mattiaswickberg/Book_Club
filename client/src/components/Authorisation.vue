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
    console.log(this.$route.query)
    if(this.$route.query.user !== null) {
      this.$session.start()
      this.$session.user = this.$route.query.user
      console.log('User logged in: ')
      console.log(this.$session.get('user'))
    }
    this.$router.push('mainloggedin')
  }
}
</script>

<style lang="scss" scoped>

</style>
