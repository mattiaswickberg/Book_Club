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
export default {
  data () {
    return {
      user: ''
    }
  },
  computed: {
    vueRoot() {
      return this.$root
    }
  },
  created() {
    HTTP.get('/sessionstatus')
      .then(response => {
        console.log('session response: ')
        console.log(response.data)
        if(response.data !== null && response.data !== undefined) {
          this.$session.start()
          this.$session.set('user', response.data)
          this.user = this.$session.get('user')
          console.log('User set')
        }
        })
        // this.$session.start()
        //this.$session.set('user', this.$route.query.user)
        // this.vueRoot.user =  this.$session.get('user')
      }
    }
</script>

<style lang="scss" scoped>

</style>
